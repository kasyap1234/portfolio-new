<script lang="ts">
	import { onMount } from 'svelte';
	import { profile } from '$lib/data';
	import Nav from '$lib/components/Nav.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import Work from '$lib/components/Work.svelte';
	import About from '$lib/components/About.svelte';
	import Contact from '$lib/components/Contact.svelte';

	let progress = $state(0);

	onMount(() => {
		const onScroll = () => {
			const h = document.documentElement;
			const max = h.scrollHeight - h.clientHeight;
			progress = max > 0 ? (h.scrollTop / max) * 100 : 0;
		};
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});

	const title = `${profile.name} — ${profile.role}`;
	const desc = `${profile.name} is a frontend engineer crafting fast, tactile web interfaces where engineering rigor meets editorial polish.`;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={desc} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={desc} />
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="progress" style="transform: scaleX({progress / 100})"></div>

<Nav />

<main>
	<Hero />
	<Work />
	<About />
	<Contact />
</main>

<style>
	.progress {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		height: 2px;
		background: var(--accent);
		transform-origin: left;
		z-index: 200;
	}
</style>
