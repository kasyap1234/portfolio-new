<script lang="ts">
	import { profile } from '$lib/data';
	import { reveal, magnetic } from '$lib/actions';

	let copied = $state(false);
	async function copyEmail() {
		try {
			await navigator.clipboard.writeText(profile.email);
			copied = true;
			setTimeout(() => (copied = false), 1800);
		} catch {
			location.href = `mailto:${profile.email}`;
		}
	}
	const year = new Date().getFullYear();
</script>

<section id="contact" class="contact">
	<div class="shell">
		<div class="head" use:reveal>
			<span class="eyebrow"><span class="idx">03</span> / Contact</span>
		</div>

		<div class="cta-wrap" use:reveal={{ delay: 60 }}>
			<h2 class="big">
				Got a system that<br />
				needs to <span class="serif acid">hold up?</span>
			</h2>

			<button class="mail" onclick={copyEmail} use:magnetic={0.2} data-cursor>
				<span class="mono mlbl">{copied ? 'Copied to clipboard' : 'Tap to copy'}</span>
				<span class="addr">{profile.email}</span>
				<span class="ico" aria-hidden="true">
					{#if copied}
						<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 13l4 4L19 7" /></svg>
					{:else}
						<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15V5a2 2 0 012-2h10" /></svg>
					{/if}
				</span>
			</button>
		</div>

		<div class="socials" use:reveal={{ delay: 140 }}>
			{#each profile.socials as s}
				<a class="soc" href={s.href} target="_blank" rel="noopener" use:magnetic={0.2}>
					<span class="sn">{s.label}</span>
					<span class="sh mono">{s.handle}</span>
				</a>
			{/each}
		</div>
	</div>

	<footer class="foot">
		<div class="shell frow">
			<span class="mono">© {year} {profile.name}</span>
			<span class="mono mid">Built with SvelteKit · Fraunces · Spline Sans Mono</span>
			<a class="mono top" href="#top">Back to top ↑</a>
		</div>
	</footer>
</section>

<style>
	.contact {
		padding-top: clamp(5rem, 14vh, 10rem);
	}
	.head {
		margin-bottom: 2.5rem;
	}
	.cta-wrap {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		flex-wrap: wrap;
		gap: 2.5rem;
		padding-bottom: clamp(3rem, 8vh, 6rem);
		border-bottom: 1px solid var(--rule);
	}
	.big {
		font-family: var(--font-display);
		font-weight: 400;
		font-size: clamp(2.8rem, 9vw, 8rem);
		line-height: 0.92;
		letter-spacing: -0.02em;
	}
	.big .serif {
		font-style: italic;
	}
	.mail {
		appearance: none;
		background: transparent;
		border: 1px solid var(--rule-strong);
		border-radius: 14px;
		color: var(--bone);
		text-align: left;
		padding: 1.4rem 1.6rem;
		display: grid;
		gap: 0.35rem;
		min-width: min(420px, 100%);
		transition: border-color 0.35s var(--ease), background 0.35s var(--ease);
		position: relative;
	}
	.mail:hover {
		border-color: var(--acid);
		background: rgba(205, 245, 100, 0.05);
	}
	.mlbl {
		font-size: 0.66rem;
		color: var(--bone-faint);
	}
	.addr {
		font-family: var(--font-display);
		font-style: italic;
		font-size: clamp(1.4rem, 3vw, 2.2rem);
	}
	.mail .ico {
		position: absolute;
		top: 1.3rem;
		right: 1.4rem;
		color: var(--acid);
	}

	.socials {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		border-bottom: 1px solid var(--rule);
	}
	.soc {
		padding: clamp(1.5rem, 4vh, 2.6rem) 0;
		display: grid;
		gap: 0.4rem;
		border-right: 1px solid var(--rule);
		padding-left: 1.2rem;
		transition: background 0.35s var(--ease);
	}
	.soc:first-child {
		padding-left: 0;
	}
	.soc:last-child {
		border-right: 0;
	}
	.soc:hover {
		background: var(--ink-3);
	}
	.sn {
		font-size: 1.05rem;
		font-weight: 600;
		transition: color 0.3s var(--ease);
	}
	.soc:hover .sn {
		color: var(--acid);
	}
	.sh {
		font-size: 0.7rem;
		color: var(--bone-faint);
	}

	.foot {
		padding-block: 2rem;
	}
	.frow {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
		flex-wrap: wrap;
	}
	.frow .mono {
		font-size: 0.66rem;
		color: var(--bone-faint);
	}
	.mid {
		text-align: center;
	}
	.top {
		transition: color 0.3s var(--ease);
	}
	.top:hover {
		color: var(--acid) !important;
	}

	@media (max-width: 720px) {
		.socials {
			grid-template-columns: 1fr 1fr;
		}
		.soc {
			border-right: 0;
			padding-left: 0;
		}
		.mid {
			display: none;
		}
	}
</style>
