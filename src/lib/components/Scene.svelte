<script lang="ts">
	// Scene graph for the fixed WebGL background — must stay a child of <Canvas>.
	// "Drift": an ambient particle current — fine bone motes and sparse vermillion
	// embers advected by a slow divergence-free flow, lit only where the current
	// pools (right half / lower right) so it never fights the headline.
	import { T, useTask, useThrelte } from '@threlte/core';
	import { onDestroy, onMount } from 'svelte';
	import {
		AdditiveBlending,
		BufferAttribute,
		BufferGeometry,
		CanvasTexture,
		Color,
		DynamicDrawUsage,
		Group,
		PerspectiveCamera,
		ShaderMaterial,
		Sprite,
		SpriteMaterial,
		Vector3
	} from 'three';
	import { sceneState } from '$lib/scene.svelte';

	const { size, dpr, invalidate } = useThrelte();

	const FOV = 42;
	const FOG_DENSITY = 0.05;
	const isNarrow = typeof window !== 'undefined' && window.innerWidth < 720;
	const camZ = isNarrow ? 13 : 9.5;
	const COUNT = isNarrow ? 5200 : 11500;

	const BONE = new Color('#ece6da');
	const EMBER = new Color('#f4502a');

	// advection volume in group-local units — the group sits ~1.15 right of centre
	const X0 = -9.5;
	const X1 = 7.8;
	const Y0 = -5.4;
	const Y1 = 5.4;
	const Z0 = -4.8;
	const Z1 = 3.6;

	// where the current is lit: basin centre + edges of the left/right ramps
	const POOL = { x: isNarrow ? 0.2 : 1.7, y: isNarrow ? -1.45 : -0.95, z: -0.2 };
	const RAMP_L = isNarrow ? -4.6 : -5.0;
	const RAMP_R = isNarrow ? -0.6 : 1.2;

	const FLOW_SPEED = 0.85; // curl-field scale — mean mote speed ≈ 0.35 u/s
	const DRIFT_X = 0.12; // slow prevailing current toward the lower right
	const DRIFT_Y = -0.045;
	const STIR_R2 = 12.25; // pointer stir radius² (3.5 units)

	// ---- shared point shader: soft gaussian discs, twinkle, ink fog, and a
	// compositional "light shaft" mask — the current is only visible where it
	// pools, thinning to nearly nothing under the headline on the left ----
	const f2 = (n: number) => n.toFixed(2);
	const DRIFT_VERT = /* glsl */ `
		uniform float uTime;
		uniform float uPointScale;
		uniform float uFade;
		uniform float uScale;
		uniform float uFog;
		attribute vec3 aColor;
		attribute float aSize;
		attribute float aSeed;
		attribute float aLife;
		varying vec3 vColor;
		varying float vAlpha;
		float poolMask(vec3 p) {
			float mx = smoothstep(${f2(RAMP_L)}, -1.5, p.x) * 0.55
				+ smoothstep(-1.5, ${f2(RAMP_R)}, p.x) * 0.45;
			mx *= 1.0 - smoothstep(4.9, 7.6, p.x);
			float low = 0.8 + 0.2 * (1.0 - smoothstep(-2.5, 2.5, p.y));
			float my = 1.0 - smoothstep(4.0, 5.6, abs(p.y + 0.4));
			float mz = 1.0 - smoothstep(3.2, 4.8, abs(p.z + 0.3));
			vec3 q = (p - vec3(${f2(POOL.x)}, ${f2(POOL.y)}, ${f2(POOL.z)})) / vec3(3.6, 2.7, 3.2);
			float basin = exp(-dot(q, q));
			return clamp(mx * low * (0.35 + 0.9 * basin), 0.0, 1.0) * my * mz;
		}
		void main() {
			vec4 mv = modelViewMatrix * vec4(position, 1.0);
			gl_Position = projectionMatrix * mv;
			float ph = aSeed * 6.28318;
			float tw = 0.66 + 0.34 * sin(uTime * (0.35 + aSeed * 1.5) + ph * 11.0);
			float dist = -mv.z;
			float fogF = exp(-uFog * uFog * dist * dist);
			vAlpha = tw * aLife * poolMask(position) * uFade * fogF;
			vColor = aColor;
			gl_PointSize = min(aSize * uScale * uPointScale / dist, 96.0);
		}
	`;
	const DRIFT_FRAG = /* glsl */ `
		varying vec3 vColor;
		varying float vAlpha;
		void main() {
			vec2 uv = gl_PointCoord - 0.5;
			float r2 = dot(uv, uv) * 4.0;
			if (r2 > 1.0) discard;
			float a = (exp(-r2 * 3.6) - exp(-3.6)) / (1.0 - exp(-3.6));
			gl_FragColor = vec4(vColor, a * vAlpha);
		}
	`;

	// ---- divergence-free flow field ----
	// v = ∇×A for a vector potential A built from two slow sinusoid modes per
	// component. Incompressible by construction, so motes shear into drifting
	// lanes and filaments instead of clumping or thinning out. Only the
	// derivatives of A are needed — six cosines per particle per frame.
	const K = [
		[0.31, 0.47, -0.26, -0.55, 0.24, 0.66], // A1: wave vector of mode 0, mode 1
		[0.42, -0.36, 0.29, 0.22, 0.61, -0.47], // A2
		[-0.28, 0.53, 0.39, 0.66, -0.21, -0.35] // A3
	];
	const AMP = [1.2, 0.55]; // primary mode a touch stronger so lanes read
	const OMEGA = [0.031, -0.043, 0.047, 0.029, -0.037, 0.053]; // per component, per mode
	const PHASE = [0.0, 2.1, 1.3, 4.2, 2.7, 0.6];

	const fv = new Float32Array(3);
	function flowAt(x: number, y: number, z: number, t: number) {
		let d1x = 0,
			d1y = 0,
			d1z = 0,
			d2x = 0,
			d2y = 0,
			d2z = 0,
			d3x = 0,
			d3y = 0,
			d3z = 0;
		for (let c = 0; c < 3; c++) {
			const Kc = K[c];
			for (let m = 0; m < 2; m++) {
				const j = m * 3;
				const i = c * 2 + m;
				const cs =
					Math.cos(Kc[j] * x + Kc[j + 1] * y + Kc[j + 2] * z + OMEGA[i] * t + PHASE[i]) *
					AMP[m];
				if (c === 0) {
					d1x += Kc[j] * cs;
					d1y += Kc[j + 1] * cs;
					d1z += Kc[j + 2] * cs;
				} else if (c === 1) {
					d2x += Kc[j] * cs;
					d2y += Kc[j + 1] * cs;
					d2z += Kc[j + 2] * cs;
				} else {
					d3x += Kc[j] * cs;
					d3y += Kc[j + 1] * cs;
					d3z += Kc[j + 2] * cs;
				}
			}
		}
		// v = ∇×A
		fv[0] = d3y - d2z;
		fv[1] = d1z - d3x;
		fv[2] = d2x - d1y;
	}

	// ---- particle state (CPU advection — cheap, and gives exact life control) ----
	const pos = new Float32Array(COUNT * 3);
	const life = new Float32Array(COUNT); // 0..1 soft fade — nothing ever pops
	const age = new Float32Array(COUNT);
	const maxAge = new Float32Array(COUNT);
	const dying = new Uint8Array(COUNT);
	const kind = new Uint8Array(COUNT); // 0 mote · 1 ember · 2 bokeh

	const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);
	const gauss = () => (Math.random() + Math.random() + Math.random() + Math.random() - 2) * 1.732;

	let stirX = 0;
	let stirY = 0;
	let stirZ = 0;
	const scroll0 = sceneState.scroll; // initial scroll — seeds the static frame
	let scrollS = scroll0;
	let t = 0;

	function spawn(i: number) {
		const o = i * 3;
		const k = kind[i];
		if (k === 1) {
			// embers seed straight into the warm basin so a few are always lit
			pos[o] = clamp(POOL.x + gauss() * 2.1, X0 + 1, X1 - 1);
			pos[o + 1] = clamp(POOL.y + gauss() * 1.6, Y0 + 1, Y1 - 1);
			pos[o + 2] = clamp(POOL.z + gauss() * 1.7, Z0 + 1, Z1 - 1);
		} else {
			pos[o] = X0 + Math.random() * (X1 - X0);
			pos[o + 1] = Y0 + Math.random() * (Y1 - Y0);
			// bokeh motes hug the depth extremes for parallax
			pos[o + 2] =
				k === 2
					? Math.random() < 0.55
						? Z0 + Math.random() * 1.7
						: 1.6 + Math.random() * (Z1 - 1.6)
					: Z0 + Math.random() * (Z1 - Z0);
		}
		age[i] = 0;
		maxAge[i] = 16 + Math.random() * 34;
		life[i] = 0;
		dying[i] = 0;
	}

	function step(d: number, stir: boolean) {
		const fs = FLOW_SPEED * (1 - scrollS * 0.55);
		const dx0 = DRIFT_X + sceneState.pointer.x * 0.07;
		const dy0 = DRIFT_Y + sceneState.pointer.y * 0.035;
		for (let i = 0; i < COUNT; i++) {
			const o = i * 3;
			let x = pos[o];
			let y = pos[o + 1];
			let z = pos[o + 2];
			flowAt(x, y, z, t);
			let vx = fv[0] * fs + dx0;
			let vy = fv[1] * fs + dy0;
			const vz = fv[2] * fs;
			// two broad conveyor lanes pulling toward the lower right —
			// shear along x that varies only in y is still divergence-free
			const l0 = ((y + 0.9) * (y + 0.9)) / 3.9;
			const l1 = ((y - 1.7) * (y - 1.7)) / 2.6;
			vx += 0.31 * Math.exp(-l0) + 0.18 * Math.exp(-l1);
			vy -= 0.06 * Math.exp(-l0);
			// gentle swirl around the pointer's ray at z≈0
			if (stir) {
				const sx = x - stirX;
				const sy = y - stirY;
				const sz = (z - stirZ) * 0.6;
				const r2 = sx * sx + sy * sy + sz * sz;
				if (r2 < STIR_R2) {
					const s = (1 - r2 / STIR_R2) * 0.55;
					vx += -sy * s;
					vy += sx * s;
				}
			}
			x += vx * d;
			y += vy * d;
			z += vz * d;
			age[i] += d;
			if (dying[i]) {
				life[i] -= d * 1.5;
				if (life[i] <= 0) {
					spawn(i);
					continue;
				}
			} else {
				if (life[i] < 1) life[i] = Math.min(1, life[i] + d * 0.8);
				if (
					x < X0 ||
					x > X1 ||
					y < Y0 ||
					y > Y1 ||
					z < Z0 ||
					z > Z1 ||
					age[i] > maxAge[i]
				)
					dying[i] = 1;
			}
			pos[o] = x;
			pos[o + 1] = y;
			pos[o + 2] = z;
		}
	}

	// ---- attribute fill: ~86% fine bone motes, ~5.5% warmer/larger embers,
	// ~8% big dim defocused bokeh for depth ----
	const col = new Float32Array(COUNT * 3);
	const siz = new Float32Array(COUNT);
	const seed = new Float32Array(COUNT);
	const tint = new Color();
	for (let i = 0; i < COUNT; i++) {
		const r = Math.random();
		if (r < 0.055) {
			kind[i] = 1;
			tint.copy(EMBER).multiplyScalar(0.9 + Math.random() * 0.5);
			siz[i] = 0.05 + Math.random() * 0.05;
		} else if (r < 0.135) {
			kind[i] = 2;
			tint.copy(BONE).multiplyScalar(0.07 + Math.random() * 0.13);
			siz[i] = 0.15 + Math.random() * 0.16;
		} else {
			kind[i] = 0;
			const b = Math.random();
			tint
				.copy(BONE)
				.multiplyScalar(b < 0.08 ? 0.6 + Math.random() * 0.4 : 0.2 + Math.random() * 0.5);
			siz[i] = 0.024 + Math.random() * 0.032;
		}
		col[i * 3] = tint.r;
		col[i * 3 + 1] = tint.g;
		col[i * 3 + 2] = tint.b;
		seed[i] = Math.random();
		spawn(i);
	}

	// pre-roll ~12s of advection so lanes already exist in the very first
	// (and possibly only, for reduced-motion) frame
	for (let s = 0; s < 80; s++) {
		t += 0.15;
		step(0.15, false);
	}

	// soft radial glow sprite — faint warm aura pooled where density is highest
	function makeGlowTexture() {
		const s = 256;
		const cv = document.createElement('canvas');
		cv.width = cv.height = s;
		const g = cv.getContext('2d')!;
		const grad = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
		grad.addColorStop(0, 'rgba(244, 80, 42, 0.38)');
		grad.addColorStop(0.35, 'rgba(244, 80, 42, 0.11)');
		grad.addColorStop(1, 'rgba(244, 80, 42, 0)');
		g.fillStyle = grad;
		g.fillRect(0, 0, s, s);
		return new CanvasTexture(cv);
	}

	const geo = new BufferGeometry();
	const posAttr = new BufferAttribute(pos, 3);
	posAttr.setUsage(DynamicDrawUsage);
	const lifeAttr = new BufferAttribute(life, 1);
	lifeAttr.setUsage(DynamicDrawUsage);
	geo.setAttribute('position', posAttr);
	geo.setAttribute('aColor', new BufferAttribute(col, 3));
	geo.setAttribute('aSize', new BufferAttribute(siz, 1));
	geo.setAttribute('aSeed', new BufferAttribute(seed, 1));
	geo.setAttribute('aLife', lifeAttr);

	const driftMaterial = new ShaderMaterial({
		vertexShader: DRIFT_VERT,
		fragmentShader: DRIFT_FRAG,
		transparent: true,
		depthWrite: false,
		blending: AdditiveBlending,
		uniforms: {
			uTime: { value: t },
			// real initial scale — the on-demand static frame may render
			// before the task loop has ever run
			uPointScale: {
				value: (size.current.height * dpr.current) / (2 * Math.tan((FOV * Math.PI) / 360))
			},
			uFade: { value: 1 - scroll0 * 0.72 },
			uScale: { value: 1 - scroll0 * 0.26 },
			uFog: { value: FOG_DENSITY }
		}
	});
	const glowTex = makeGlowTexture();

	let cam = $state<PerspectiveCamera>();
	let group = $state<Group>();
	let glow = $state<Sprite>();
	let glowMat = $state<SpriteMaterial>();

	let reveal = sceneState.reduced ? 1 : 0;
	const ray = new Vector3();

	useTask((delta) => {
		if (sceneState.reduced) {
			// reduced motion renders a static frame — but it must still honor
			// the scroll choreography: keep point scale fresh, and whenever the
			// scroll position moves update the fade/transform and re-render
			// once — without paying for the per-frame advection
			driftMaterial.uniforms.uPointScale.value =
				(size.current.height * dpr.current) / (2 * Math.tan((FOV * Math.PI) / 360));
			if (sceneState.scroll !== scrollS) {
				scrollS = sceneState.scroll;
				if (group) {
					group.position.x = 1.15 + scrollS * 1.1;
					group.position.y = -scrollS * 1.7;
					group.position.z = -scrollS * 2.2;
					group.scale.setScalar(1 - scrollS * 0.26);
				}
				driftMaterial.uniforms.uFade.value = 1 - scrollS * 0.72;
				driftMaterial.uniforms.uScale.value = group ? group.scale.x : 1;
				if (glowMat) glowMat.opacity = 0.34 * (1 - scrollS * 0.8);
				invalidate();
			}
			return;
		}
		const d = Math.min(delta, 0.05);
		t += d;

		// eased scroll keeps the choreography buttery
		scrollS += (sceneState.scroll - scrollS) * Math.min(1, d * 3.2);
		reveal = Math.min(1, reveal + d * 0.55);

		const px = sceneState.pointer.x;
		const py = sceneState.pointer.y;

		// camera parallax toward the pointer
		if (cam) {
			cam.position.x += (px * 0.8 - cam.position.x) * 0.04;
			cam.position.y += (py * 0.55 - cam.position.y) * 0.04;
			cam.lookAt(0, 0, 0);
		}

		// scroll choreography: the pool drifts right, sinks, and recedes
		// into the fog — it must never distract from the sections below
		if (group) {
			group.position.x = 1.15 + scrollS * 1.1;
			group.position.y = Math.sin(t * 0.28) * 0.1 - scrollS * 1.7;
			group.position.z = -scrollS * 2.2;
			group.scale.setScalar(1 - scrollS * 0.26);
			// subtle tilt toward the pointer so the current feels alive
			group.rotation.y += (px * 0.08 - group.rotation.y) * 0.02;
			group.rotation.x += (-py * 0.05 - group.rotation.x) * 0.02;
		}

		// pointer ray at the z≈0 plane → group-local stir centre
		let stir = false;
		if (cam && group && (px !== 0 || py !== 0)) {
			ray.set(px, py, 0.5).unproject(cam).sub(cam.position);
			const s = -cam.position.z / ray.z;
			stirX = cam.position.x + ray.x * s - group.position.x;
			stirY = cam.position.y + ray.y * s - group.position.y;
			stirZ = -group.position.z;
			stir = true;
		}

		step(d, stir);
		posAttr.needsUpdate = true;
		lifeAttr.needsUpdate = true;

		const s = group ? group.scale.x : 1;
		const pointScale =
			(size.current.height * dpr.current) / (2 * Math.tan((FOV * Math.PI) / 360));

		driftMaterial.uniforms.uTime.value = t;
		driftMaterial.uniforms.uFade.value = (1 - scrollS * 0.72) * reveal;
		driftMaterial.uniforms.uPointScale.value = pointScale;
		driftMaterial.uniforms.uScale.value = s;

		if (glowMat)
			glowMat.opacity = (0.34 + Math.sin(t * 0.5) * 0.05) * (1 - scrollS * 0.8) * reveal;
		if (glow) {
			const gs = 9.5 + Math.sin(t * 0.45) * 0.4;
			glow.scale.set(gs, gs, 1);
		}
	});

	// demand-mode (reduced motion) renders exactly this one static frame
	onMount(() => invalidate());
	onDestroy(() => {
		geo.dispose();
		driftMaterial.dispose();
		glowTex.dispose();
	});
</script>

<T.PerspectiveCamera
	makeDefault
	position={[0, 0, camZ]}
	fov={FOV}
	bind:ref={cam}
	oncreate={(ref) => ref.lookAt(0, 0, 0)}
/>

<T.Group
	bind:ref={group}
	position={[1.15 + scroll0 * 1.1, -scroll0 * 1.7, -scroll0 * 2.2]}
	scale={1 - scroll0 * 0.26}
>
	<!-- faint warm aura pooled where the current is densest -->
	<T.Sprite bind:ref={glow} position={[POOL.x, POOL.y, -1.2]} scale={[9.5, 9.5, 1]} renderOrder={-1}>
		<T.SpriteMaterial
			bind:ref={glowMat}
			map={glowTex}
			transparent
			opacity={0.34 * (1 - scroll0 * 0.8)}
			depthWrite={false}
			blending={AdditiveBlending}
			fog={false}
		/>
	</T.Sprite>

	<T.Points geometry={geo} material={driftMaterial} frustumCulled={false} />
</T.Group>
