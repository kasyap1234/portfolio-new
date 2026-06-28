<script lang="ts">
	import { onMount } from 'svelte';
	import { profile } from '$lib/data';
	import { magnetic } from '$lib/actions';

	let clock = $state('--:--:--');
	let scrolled = $state(false);
	let menuOpen = $state(false);

	const links = [
		{ label: 'Work', href: '#work' },
		{ label: 'About', href: '#about' },
		{ label: 'Contact', href: '#contact' }
	];

	const closeMenu = () => (menuOpen = false);
	const toggleMenu = () => (menuOpen = !menuOpen);

	onMount(() => {
		const tick = () => {
			try {
				clock = new Intl.DateTimeFormat('en-GB', {
					hour: '2-digit',
					minute: '2-digit',
					second: '2-digit',
					timeZone: profile.tz
				}).format(new Date());
			} catch {
				clock = new Date().toLocaleTimeString();
			}
		};
		tick();
		const id = setInterval(tick, 1000);
		const onScroll = () => (scrolled = window.scrollY > 24);
		onScroll();
		const onResize = () => {
			if (window.innerWidth > 900) menuOpen = false;
		};
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') menuOpen = false;
		};
		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', onResize, { passive: true });
		window.addEventListener('keydown', onKey);
		return () => {
			clearInterval(id);
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onResize);
			window.removeEventListener('keydown', onKey);
		};
	});

	// lock body scroll while the mobile drawer is open
	$effect(() => {
		if (typeof document === 'undefined') return;
		document.body.style.overflow = menuOpen ? 'hidden' : '';
		return () => {
			document.body.style.overflow = '';
		};
	});
</script>

<header class="nav" class:scrolled class:menu-open={menuOpen}>
	<div class="shell bar">
		<a class="brand" href="#top" aria-label="Back to top" onclick={closeMenu}>
			<span class="mark">KM</span>
			<span class="meta">
				<span class="nm">{profile.name}</span>
				<span class="mono rl">{profile.role}</span>
			</span>
		</a>

		<nav class="links" aria-label="Primary">
			{#each links as l}
				<a href={l.href} class="lnk" use:magnetic={0.25}>
					<span class="dotmark"></span>{l.label}
				</a>
			{/each}
		</nav>

		<div class="side">
			<span class="mono clk">
				{profile.location.split(',')[0]} · {clock}
			</span>
			<a class="cta" href="#contact" use:magnetic={0.3}>
				<span class="pulse"></span> Available
			</a>
			<button
				class="burger"
				onclick={toggleMenu}
				aria-label={menuOpen ? 'Close menu' : 'Open menu'}
				aria-expanded={menuOpen}
				aria-controls="mobile-menu"
			>
				<span class="bun"></span>
				<span class="bun"></span>
			</button>
		</div>
	</div>
</header>

<!-- mobile drawer -->
<div
	class="scrim"
	class:show={menuOpen}
	onclick={closeMenu}
	aria-hidden="true"
></div>

<nav
	id="mobile-menu"
	class="drawer"
	class:open={menuOpen}
	aria-label="Mobile"
	aria-hidden={!menuOpen}
	inert={!menuOpen}
>
	<ul class="dlinks">
		{#each links as l, i}
			<li style="--i: {i}">
				<a href={l.href} class="dlnk" onclick={closeMenu}>
					<span class="dix mono">0{i + 1}</span>
					<span class="dlabel serif">{l.label}</span>
					<span class="darr" aria-hidden="true">
						<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M7 17L17 7M17 7H8M17 7v9" /></svg>
					</span>
				</a>
			</li>
		{/each}
	</ul>

	<div class="dfoot">
		<span class="pulse"></span>
		<span class="mono">Open to select work — {profile.location.split(',')[0]} · {clock}</span>
	</div>
</nav>

<style>
	.nav {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 100;
		transition: background 0.4s var(--ease), border-color 0.4s var(--ease);
		border-bottom: 1px solid transparent;
	}
	.nav.scrolled {
		background: color-mix(in srgb, var(--ink) 72%, transparent);
		backdrop-filter: blur(14px) saturate(1.2);
		border-bottom: 1px solid var(--rule);
	}
	.bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1.5rem;
		height: 76px;
	}
	.brand {
		display: flex;
		align-items: center;
		gap: 0.7rem;
	}
	.mark {
		font-family: var(--font-mono);
		font-weight: 700;
		font-size: 0.85rem;
		letter-spacing: 0.05em;
		color: var(--ink);
		background: var(--acid);
		width: 34px;
		height: 34px;
		display: grid;
		place-items: center;
		border-radius: 3px;
	}
	.meta {
		display: flex;
		flex-direction: column;
		line-height: 1.05;
	}
	.nm {
		font-weight: 600;
		font-size: 0.92rem;
	}
	.rl {
		font-size: 0.62rem;
		letter-spacing: 0.16em;
	}
	.links {
		display: flex;
		gap: 0.4rem;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
	}
	.lnk {
		font-family: var(--font-mono);
		font-size: 0.74rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		padding: 0.5rem 0.9rem;
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		color: var(--bone-dim);
		transition: color 0.25s var(--ease);
	}
	.lnk .dotmark {
		width: 4px;
		height: 4px;
		border-radius: 50%;
		background: var(--bone-faint);
		transition: all 0.25s var(--ease);
	}
	.lnk:hover {
		color: var(--bone);
	}
	.lnk:hover .dotmark {
		background: var(--accent);
	}
	.side {
		display: flex;
		align-items: center;
		gap: 1.1rem;
	}
	.clk {
		font-size: 0.68rem;
	}
	.cta {
		display: inline-flex;
		align-items: center;
		gap: 0.55rem;
		font-family: var(--font-mono);
		font-size: 0.72rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		padding: 0.55rem 0.95rem;
		border: 1px solid var(--rule-strong);
		border-radius: 100px;
		color: var(--bone);
		transition: border-color 0.3s var(--ease), background 0.3s var(--ease);
	}
	.cta:hover {
		border-color: var(--accent);
		background: rgba(var(--accent-rgb), 0.07);
	}

	/* ---- hamburger ---- */
	.burger {
		display: none;
		appearance: none;
		background: transparent;
		border: 1px solid var(--rule-strong);
		border-radius: 8px;
		width: 42px;
		height: 42px;
		padding: 0;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 5px;
		cursor: pointer;
		transition: border-color 0.3s var(--ease);
	}
	.burger:hover {
		border-color: var(--acid);
	}
	.burger .bun {
		display: block;
		width: 18px;
		height: 1.5px;
		background: var(--bone);
		border-radius: 2px;
		transition: transform 0.34s var(--ease-out), background 0.3s var(--ease);
	}
	.menu-open .burger {
		border-color: var(--acid);
	}
	.menu-open .burger .bun {
		background: var(--acid);
	}
	.menu-open .burger .bun:first-child {
		transform: translateY(3.25px) rotate(45deg);
	}
	.menu-open .burger .bun:last-child {
		transform: translateY(-3.25px) rotate(-45deg);
	}

	/* ---- scrim ---- */
	.scrim {
		position: fixed;
		inset: 0;
		z-index: 90;
		background: rgba(7, 7, 6, 0.6);
		backdrop-filter: blur(3px);
		opacity: 0;
		visibility: hidden;
		transition: opacity 0.4s var(--ease), visibility 0.4s var(--ease);
	}
	.scrim.show {
		opacity: 1;
		visibility: visible;
	}

	/* ---- drawer ---- */
	.drawer {
		position: fixed;
		top: 0;
		right: 0;
		z-index: 110;
		height: 100svh;
		width: min(86vw, 360px);
		background: var(--ink-2);
		border-left: 1px solid var(--rule-strong);
		padding: calc(76px + 1.5rem) 1.6rem 1.8rem;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 2rem;
		transform: translateX(100%);
		transition: transform 0.46s var(--ease-out);
		box-shadow: -40px 0 80px rgba(0, 0, 0, 0.5);
	}
	.drawer.open {
		transform: translateX(0);
	}
	.dlinks {
		list-style: none;
		display: grid;
		border-top: 1px solid var(--rule);
	}
	.dlinks li {
		border-bottom: 1px solid var(--rule);
	}
	.dlnk {
		display: flex;
		align-items: baseline;
		gap: 1rem;
		padding: 1.25rem 0.2rem;
		color: var(--bone);
		transition: padding-left 0.35s var(--ease), color 0.3s var(--ease);
	}
	.dlnk:hover {
		padding-left: 0.9rem;
		color: var(--acid);
	}
	.dix {
		font-size: 0.7rem;
		color: var(--bone-faint);
		transition: color 0.3s var(--ease);
	}
	.dlnk:hover .dix {
		color: var(--acid);
	}
	.dlabel {
		font-size: clamp(1.9rem, 8vw, 2.6rem);
		line-height: 1;
		font-style: italic;
		flex: 1;
	}
	.darr {
		display: grid;
		place-items: center;
		color: var(--bone-faint);
		opacity: 0;
		transform: translateX(-6px);
		transition: opacity 0.3s var(--ease), transform 0.3s var(--ease), color 0.3s var(--ease);
	}
	.dlnk:hover .darr {
		opacity: 1;
		transform: translateX(0);
		color: var(--acid);
	}
	/* staggered entrance once the drawer opens */
	.drawer.open .dlinks li {
		animation: drawerIn 0.5s var(--ease-out) backwards;
		animation-delay: calc(120ms + var(--i) * 65ms);
	}
	@keyframes drawerIn {
		from {
			opacity: 0;
			transform: translateX(18px);
		}
	}
	.dfoot {
		display: flex;
		align-items: center;
		gap: 0.7rem;
		padding-top: 1.3rem;
		border-top: 1px solid var(--rule);
	}
	.dfoot .mono {
		font-size: 0.66rem;
		color: var(--bone-dim);
	}

	@media (max-width: 900px) {
		.links {
			display: none;
		}
		.clk {
			display: none;
		}
		.burger {
			display: flex;
		}
	}
	@media (max-width: 560px) {
		.rl {
			display: none;
		}
		.cta {
			display: none;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.drawer,
		.burger .bun,
		.scrim {
			transition-duration: 0.001ms;
		}
		.drawer.open .dlinks li {
			animation: none;
		}
	}
</style>
