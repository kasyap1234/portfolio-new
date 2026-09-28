<script lang="ts">
	// Fixed, pointer-events-free WebGL layer behind all page content.
	// Owns the global listeners feeding sceneState; renders nothing if WebGL fails.
	import { onMount } from 'svelte';
	import { Canvas } from '@threlte/core';
	import { NoToneMapping } from 'three';
	import Scene from './Scene.svelte';
	import { sceneState } from '$lib/scene.svelte';

	let mounted = $state(false);
	let webgl = $state(true);
	let dpr = $state(1);

	onMount(() => {
		try {
			const probe = document.createElement('canvas');
			webgl = !!(probe.getContext('webgl2') ?? probe.getContext('webgl'));
		} catch {
			webgl = false;
		}
		if (!webgl) return;

		dpr = Math.min(window.devicePixelRatio || 1, 1.75);

		const mq = matchMedia('(prefers-reduced-motion: reduce)');
		const applyMq = () => (sceneState.reduced = mq.matches);
		applyMq();
		mq.addEventListener('change', applyMq);

		const onPointer = (e: PointerEvent) => {
			sceneState.pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
			sceneState.pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
		};
		const onScroll = () => {
			const h = document.documentElement;
			const max = h.scrollHeight - h.clientHeight;
			sceneState.scroll = max > 0 ? h.scrollTop / max : 0;
		};
		onScroll();

		const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
		if (fine) window.addEventListener('pointermove', onPointer, { passive: true });
		window.addEventListener('scroll', onScroll, { passive: true });

		// smoothed copy of the pointer for DOM consumers (hero title parallax)
		let raf = 0;
		if (!mq.matches) {
			const tick = () => {
				sceneState.smooth.x += (sceneState.pointer.x - sceneState.smooth.x) * 0.08;
				sceneState.smooth.y += (sceneState.pointer.y - sceneState.smooth.y) * 0.08;
				raf = requestAnimationFrame(tick);
			};
			raf = requestAnimationFrame(tick);
		}

		mounted = true;
		return () => {
			mq.removeEventListener('change', applyMq);
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('pointermove', onPointer);
			cancelAnimationFrame(raf);
		};
	});
</script>

<div class="bg3d" aria-hidden="true">
	{#if mounted && webgl}
		<Canvas
			dpr={[1, dpr]}
			renderMode={sceneState.reduced ? 'on-demand' : 'always'}
			toneMapping={NoToneMapping}
		>
			<Scene />
		</Canvas>
	{/if}
	<!-- readability: darken the headline zone and the viewport floor -->
	<div class="shade"></div>
</div>

<style>
	.bg3d {
		position: fixed;
		inset: 0;
		z-index: 0;
		pointer-events: none;
		overflow: hidden;
	}
	.bg3d :global(canvas) {
		display: block;
	}
	.shade {
		position: absolute;
		inset: 0;
		background:
			radial-gradient(75rem 48rem at 30% 38%, rgba(16, 14, 12, 0.5), transparent 62%),
			linear-gradient(180deg, transparent 52%, rgba(16, 14, 12, 0.5));
	}
</style>
