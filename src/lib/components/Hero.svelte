<script lang="ts">
	import { profile } from '$lib/data';
	import { magnetic } from '$lib/actions';

	const disciplines = [
		'APIs & Services',
		'Distributed Systems',
		'Data & Storage',
		'Observability'
	];
</script>

<section id="top" class="hero">
	<div class="shell">
		<!-- running header / status -->
		<div class="status load" style="--d: 0ms">
			<span class="eyebrow"><span class="pulse"></span> Available for select work — 2026</span>
			<span class="mono coords">{profile.location} · 17.39°N 78.49°E</span>
		</div>

		<hr class="rule load" style="--d: 80ms" />

		<!-- headline statement -->
		<h1 class="title">
			<span class="kick mono load" style="--d: 140ms">
				{profile.name} — {profile.role}, est. 2019
			</span>
			<span class="line load" style="--d: 220ms">Systems that</span>
			<span class="line ln2 load" style="--d: 340ms">
				stay <em class="acc">boring —</em>
			</span>
			<span class="line load" style="--d: 460ms">under load.</span>
		</h1>

		<!-- lower zone: lede + currently -->
		<div class="lower">
			<div class="left load" style="--d: 600ms">
				<p class="lede">
					I'm a backend engineer who builds the APIs, pipelines, and infrastructure
					products lean on — mostly in Go, always with the observability to prove it
					works. The unglamorous 90% that decides whether the other 10% ever ships.
				</p>
				<div class="actions">
					<a class="primary" href="#work" use:magnetic={0.28}>
						<span>Selected Work</span>
						<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2">
							<path d="M5 12h14M13 6l6 6-6 6" />
						</svg>
					</a>
					<a class="ghost" href="#contact" use:magnetic={0.22}>Get in touch</a>
				</div>
			</div>

			<aside class="now load" style="--d: 700ms">
				<span class="mono lbl">/ Currently</span>
				<p>Building high-throughput event infrastructure in <span class="acc">Go</span> — reaching for Python or TypeScript when the problem calls for it.</p>
			</aside>
		</div>

		<!-- discipline index (static, archival — no scrolling marquee) -->
		<div class="index load" style="--d: 820ms">
			{#each disciplines as d, i}
				<div class="cell">
					<span class="num mono">{String(i + 1).padStart(2, '0')}</span>
					<span class="dsc">{d}</span>
				</div>
			{/each}
		</div>
	</div>

	<a class="scrollcue mono load" href="#work" style="--d: 940ms" aria-label="Scroll to work">
		<span class="bar"></span> scroll
	</a>
</section>

<style>
	.hero {
		position: relative;
		min-height: 100svh;
		padding-top: clamp(7rem, 16vh, 11rem);
		padding-bottom: 3rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.status {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 1rem;
	}
	.coords {
		font-size: 0.68rem;
		color: var(--bone-faint);
	}
	.rule {
		margin: 1.3rem 0 clamp(1.6rem, 5vh, 3rem);
	}

	.title {
		font-family: var(--font-display);
		font-weight: 350;
		line-height: 0.94;
		letter-spacing: -0.025em;
		font-size: clamp(3.1rem, 12.5vw, 12rem);
		text-transform: none;
	}
	.kick {
		display: block;
		font-family: var(--font-mono);
		font-size: clamp(0.62rem, 0.9vw, 0.74rem);
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--bone-faint);
		margin-bottom: clamp(1rem, 3vh, 2rem);
		font-weight: 500;
	}
	.title .line {
		display: block;
	}
	/* asymmetric offset on the middle line */
	.ln2 {
		padding-left: clamp(2rem, 14vw, 13rem);
	}
	.acc {
		color: var(--accent);
		font-style: italic;
		font-weight: 360;
	}

	.lower {
		display: grid;
		grid-template-columns: 1.45fr 1fr;
		gap: clamp(1.5rem, 6vw, 5rem);
		align-items: end;
		margin-top: clamp(2.4rem, 7vh, 4.5rem);
	}
	.lede {
		font-size: clamp(1.02rem, 1.25vw, 1.3rem);
		line-height: 1.55;
		max-width: 48ch;
		color: var(--bone-dim);
	}
	.actions {
		display: flex;
		gap: 0.7rem;
		flex-wrap: wrap;
		margin-top: 1.8rem;
	}
	.primary {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		background: var(--accent);
		color: var(--ink);
		font-family: var(--font-mono);
		font-size: 0.74rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		font-weight: 600;
		padding: 0.95rem 1.4rem;
		transition: transform 0.35s var(--ease), background 0.35s var(--ease);
	}
	.primary:hover {
		background: var(--bone);
	}
	.primary svg {
		transition: transform 0.35s var(--ease-out);
	}
	.primary:hover svg {
		transform: translateX(5px);
	}
	.ghost {
		display: inline-flex;
		align-items: center;
		font-family: var(--font-mono);
		font-size: 0.74rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		padding: 0.95rem 1.35rem;
		border: 1px solid var(--rule-strong);
		color: var(--bone);
		transition: border-color 0.3s var(--ease), color 0.3s var(--ease);
	}
	.ghost:hover {
		border-color: var(--accent);
		color: var(--accent);
	}

	.now {
		border-left: 1px solid var(--rule);
		padding-left: 1.4rem;
	}
	.now .lbl {
		display: block;
		color: var(--bone-faint);
		font-size: 0.66rem;
		margin-bottom: 0.7rem;
	}
	.now p {
		font-family: var(--font-display);
		font-style: italic;
		font-weight: 360;
		font-size: clamp(1.1rem, 1.7vw, 1.5rem);
		line-height: 1.3;
		color: var(--bone);
		max-width: 26ch;
	}

	/* discipline index */
	.index {
		margin-top: clamp(2.6rem, 8vh, 5rem);
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		border-top: 1px solid var(--rule-strong);
	}
	.cell {
		display: flex;
		align-items: baseline;
		gap: 0.6rem;
		padding: 1.1rem 1.1rem 1.1rem 0;
		border-right: 1px solid var(--rule);
	}
	.cell:last-child {
		border-right: 0;
	}
	.cell .num {
		font-size: 0.66rem;
		color: var(--accent);
	}
	.cell .dsc {
		font-size: 0.82rem;
		color: var(--bone-dim);
		letter-spacing: -0.01em;
	}

	.scrollcue {
		position: absolute;
		bottom: 1.7rem;
		right: var(--gutter);
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		font-size: 0.64rem;
		letter-spacing: 0.22em;
		color: var(--bone-faint);
		writing-mode: vertical-rl;
		transition: color 0.3s var(--ease);
	}
	.scrollcue:hover {
		color: var(--accent);
	}
	.scrollcue .bar {
		width: 1px;
		height: 42px;
		background: linear-gradient(var(--accent), transparent);
		animation: cue 2.2s var(--ease) infinite;
		transform-origin: top;
	}
	@keyframes cue {
		0%,
		100% {
			transform: scaleY(0.3);
			opacity: 0.4;
		}
		50% {
			transform: scaleY(1);
			opacity: 1;
		}
	}

	/* orchestrated load */
	.load {
		opacity: 0;
		transform: translateY(26px);
		animation: rise 1s var(--ease-out) forwards;
		animation-delay: var(--d);
	}
	@keyframes rise {
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (max-width: 860px) {
		.lower {
			grid-template-columns: 1fr;
			gap: 2.2rem;
		}
		.now {
			border-left: 0;
			padding-left: 0;
			border-top: 1px solid var(--rule);
			padding-top: 1.4rem;
		}
		.index {
			grid-template-columns: 1fr 1fr;
		}
		.cell:nth-child(2) {
			border-right: 0;
		}
		.cell:nth-child(1),
		.cell:nth-child(2) {
			border-bottom: 1px solid var(--rule);
		}
		.scrollcue {
			display: none;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.load {
			opacity: 1;
			transform: none;
			animation: none;
		}
	}
</style>
