<script lang="ts">
	import { projects } from '$lib/data';
	import { reveal } from '$lib/actions';

	let active = $state<number | null>(null);
	let pointer = $state({ x: 0, y: 0 });
	let hovering = $state(false);

	function onMove(e: MouseEvent) {
		const wrap = (e.currentTarget as HTMLElement).getBoundingClientRect();
		pointer = { x: e.clientX - wrap.left, y: e.clientY - wrap.top };
	}
</script>

<section id="work" class="work">
	<div class="shell">
		<div class="head" use:reveal>
			<span class="eyebrow"><span class="idx">01</span> / Selected Work</span>
			<h2 class="serif">Things I've<br />built &amp; shipped.</h2>
			<p class="mono note">{projects.length} GitHub projects · 2024 — 2026 · hover for stack & signals</p>
		</div>

		<!-- the interactive index -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="index"
			onmousemove={onMove}
			onmouseenter={() => (hovering = true)}
			onmouseleave={() => {
				hovering = false;
				active = null;
			}}
		>
			{#each projects as p, i}
				<a
					class="row"
					href={p.href}
					target="_blank"
					rel="noopener"
					aria-label={`Open ${p.title} on GitHub`}
					class:dim={active !== null && active !== i}
					class:on={active === i}
					onmouseenter={() => (active = i)}
					use:reveal={{ delay: i * 70 }}
				>
					<span class="ix mono">{p.idx}</span>
					<span class="ttl">{p.title}</span>
					<span class="cat mono">{p.category}</span>
					<span class="role">{p.role}</span>
					<span class="yr mono">{p.year}</span>
					<span class="arr" aria-hidden="true">
						<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6">
							<path d="M7 17L17 7M17 7H8M17 7v9" />
						</svg>
					</span>
				</a>
			{/each}

			<!-- floating preview that tracks the cursor -->
			{#if active !== null}
				{@const p = projects[active]}
				<div
					class="preview"
					class:show={hovering}
					style="left:{pointer.x}px; top:{pointer.y}px; --from:{p.from}; --to:{p.to}"
				>
					<div class="thumb">
						<span class="ghostnum">{p.idx}</span>
						<div class="glow"></div>
					</div>
					<div class="pmeta">
						<p class="pblurb">{p.tagline}</p>
						<div class="chips">
							{#each p.stack as s}<span class="chip mono">{s}</span>{/each}
						</div>
						<div class="stats">
							{#each p.highlights.slice(0, 3) as h}
								<span class="stat mono"><strong>{h.value}</strong>{h.label}</span>
							{/each}
						</div>
					</div>
				</div>
			{/if}
		</div>
	</div>
</section>

<style>
	.work {
		padding-block: clamp(5rem, 14vh, 10rem);
		position: relative;
	}
	.head {
		display: grid;
		gap: 1rem;
		margin-bottom: clamp(2.5rem, 6vh, 5rem);
	}
	.head h2 {
		font-family: var(--font-display);
		font-style: italic;
		font-weight: 400;
		font-size: clamp(2.6rem, 7vw, 6rem);
		line-height: 0.95;
		letter-spacing: -0.01em;
	}
	.note {
		color: var(--bone-faint);
	}

	.index {
		position: relative;
		border-top: 1px solid var(--rule);
	}
	.row {
		display: grid;
		grid-template-columns: 4rem minmax(0, 1.4fr) 1fr 1fr 5rem 2rem;
		align-items: center;
		gap: 1.5rem;
		padding: clamp(1.3rem, 3vh, 2.2rem) 0.4rem;
		border-bottom: 1px solid var(--rule);
		transition: opacity 0.4s var(--ease), padding-left 0.4s var(--ease),
			background 0.4s var(--ease);
		position: relative;
	}
	.row.dim {
		opacity: 0.32;
	}
	.row.on {
		padding-left: 1.6rem;
	}
	.row.on::before {
		content: '';
		position: absolute;
		left: 0;
		top: 12%;
		height: 76%;
		width: 3px;
		background: var(--accent);
	}
	.ix {
		color: var(--bone-faint);
		font-size: 0.78rem;
		transition: color 0.3s var(--ease);
	}
	.row.on .ix {
		color: var(--acid);
	}
	.ttl {
		font-family: var(--font-display);
		font-size: clamp(1.8rem, 4.5vw, 3.6rem);
		line-height: 1;
		letter-spacing: -0.01em;
		transition: transform 0.4s var(--ease);
	}
	.row.on .ttl {
		font-style: italic;
		color: var(--acid);
	}
	.cat,
	.role {
		font-size: 0.82rem;
		color: var(--bone-dim);
	}
	.cat {
		letter-spacing: 0.1em;
	}
	.role {
		font-family: var(--font-sans);
	}
	.yr {
		font-size: 0.78rem;
		color: var(--bone-dim);
		text-align: right;
	}
	.arr {
		display: grid;
		place-items: center;
		color: var(--bone-faint);
		transform: translate(-6px, 0);
		opacity: 0;
		transition: all 0.4s var(--ease);
	}
	.row.on .arr {
		opacity: 1;
		transform: translate(0, 0);
		color: var(--acid);
	}

	/* cursor-tracking preview card */
	.preview {
		position: absolute;
		z-index: 20;
		width: 330px;
		pointer-events: none;
		transform: translate(28px, -50%) scale(0.96);
		opacity: 0;
		transition: opacity 0.3s var(--ease), transform 0.3s var(--ease);
		background: var(--ink-2);
		border: 1px solid var(--rule-strong);
		border-radius: 12px;
		overflow: hidden;
		box-shadow: 0 30px 80px rgba(0, 0, 0, 0.6);
	}
	.preview.show {
		opacity: 1;
		transform: translate(28px, -50%) scale(1);
	}
	.thumb {
		position: relative;
		height: 180px;
		background: linear-gradient(135deg, var(--from), var(--to));
		display: grid;
		place-items: center;
		overflow: hidden;
	}
	.ghostnum {
		font-family: var(--font-display);
		font-style: italic;
		font-size: 7rem;
		color: rgba(14, 14, 12, 0.32);
		mix-blend-mode: multiply;
	}
	.glow {
		position: absolute;
		inset: 0;
		background: radial-gradient(circle at 70% 20%, rgba(255, 255, 255, 0.25), transparent 60%);
	}
	.pmeta {
		padding: 1.1rem 1.2rem 1.3rem;
	}
	.pblurb {
		font-size: 0.95rem;
		line-height: 1.45;
		color: var(--bone);
	}
	.chips {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
		margin-top: 0.9rem;
	}
	.chip {
		font-size: 0.62rem;
		padding: 0.28rem 0.55rem;
		border: 1px solid var(--rule);
		border-radius: 100px;
		color: var(--bone-dim);
	}
	.stats {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 0.45rem;
		margin-top: 0.9rem;
	}
	.stat {
		border: 1px solid var(--rule);
		border-radius: 10px;
		padding: 0.5rem;
		color: var(--bone-dim);
		font-size: 0.58rem;
		line-height: 1.25;
	}
	.stat strong {
		display: block;
		color: var(--acid);
		font-family: var(--font-display);
		font-size: 1rem;
		font-weight: 400;
		line-height: 1;
		margin-bottom: 0.2rem;
	}

	@media (max-width: 860px) {
		.row {
			grid-template-columns: 2.4rem 1fr 4rem;
			gap: 0.8rem;
		}
		.cat,
		.role {
			display: none;
		}
		.preview {
			display: none;
		}
		.row.on .ttl {
			font-style: normal;
		}
	}
</style>
