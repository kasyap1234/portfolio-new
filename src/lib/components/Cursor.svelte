<script lang="ts">
	import { onMount } from 'svelte';

	let ring = $state({ x: 0, y: 0 });
	let dot = $state({ x: 0, y: 0 });
	let active = $state(false); // hovering interactive
	let visible = $state(false);
	let enabled = $state(false);

	onMount(() => {
		const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
		if (!fine) return;

		enabled = true;
		document.documentElement.classList.add('cursor-on');

		let tx = window.innerWidth / 2;
		let ty = window.innerHeight / 2;
		dot = { x: tx, y: ty };
		ring = { x: tx, y: ty };

		const move = (e: MouseEvent) => {
			tx = e.clientX;
			ty = e.clientY;
			dot = { x: tx, y: ty };
			visible = true;
			const el = e.target as HTMLElement;
			active = !!el.closest('a, button, [data-cursor], input, textarea');
		};
		const leave = () => (visible = false);

		let raf = 0;
		const loop = () => {
			ring.x += (tx - ring.x) * 0.18;
			ring.y += (ty - ring.y) * 0.18;
			ring = { x: ring.x, y: ring.y };
			raf = requestAnimationFrame(loop);
		};
		raf = requestAnimationFrame(loop);

		window.addEventListener('mousemove', move);
		document.addEventListener('mouseleave', leave);

		return () => {
			cancelAnimationFrame(raf);
			window.removeEventListener('mousemove', move);
			document.removeEventListener('mouseleave', leave);
			document.documentElement.classList.remove('cursor-on');
		};
	});
</script>

{#if enabled}
	<div
		class="ring"
		class:active
		class:visible
		style="transform: translate3d({ring.x}px, {ring.y}px, 0) translate(-50%, -50%) scale({active
			? 1.9
			: 1})"
	></div>
	<div
		class="dot"
		class:visible
		style="transform: translate3d({dot.x}px, {dot.y}px, 0) translate(-50%, -50%)"
	></div>
{/if}

<style>
	.ring,
	.dot {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 9999;
		pointer-events: none;
		border-radius: 50%;
		opacity: 0;
		transition: opacity 0.3s ease;
	}
	.ring {
		width: 34px;
		height: 34px;
		border: 1px solid var(--bone-faint);
		transition:
			opacity 0.3s ease,
			width 0.3s var(--ease),
			height 0.3s var(--ease);
		mix-blend-mode: difference;
	}
	.ring.active {
		border-color: var(--accent);
		background: rgba(var(--accent-rgb), 0.08);
	}
	.dot {
		width: 5px;
		height: 5px;
		background: var(--acid);
	}
	.visible {
		opacity: 1;
	}
</style>
