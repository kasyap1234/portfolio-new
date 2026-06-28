<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Cursor from '$lib/components/Cursor.svelte';
	import Grain from '$lib/components/Grain.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Cursor />
<Grain />

{@render children()}
