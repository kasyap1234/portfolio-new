<script lang="ts">
	import { capabilities, experience, stack, profile } from '$lib/data';
	import { reveal } from '$lib/actions';
</script>

<section id="about" class="about">
	<div class="shell">
		<div class="head" use:reveal>
			<span class="eyebrow"><span class="idx">02</span> / Profile</span>
		</div>

		<!-- big statement -->
		<p class="statement" use:reveal={{ delay: 60 }}>
			I believe <span class="serif acid">reliability</span> is a feature. For
			<span class="serif">six years</span> I've built the APIs, pipelines, and
			infrastructure behind products — the unglamorous work that decides whether
			everything else <span class="serif">holds up</span> at 3am.
		</p>

		<div class="grid">
			<!-- capabilities -->
			<div class="caps">
				{#each capabilities as c, i}
					<article class="cap" use:reveal={{ delay: i * 70 }}>
						<span class="k mono">{c.k}</span>
						<h3>{c.title}</h3>
						<p>{c.body}</p>
					</article>
				{/each}
			</div>

			<!-- experience + stack rail -->
			<aside class="rail">
				<div class="block" use:reveal>
					<span class="mono lbl">Experience</span>
					<ul class="exp">
						{#each experience as e}
							<li>
								<div class="erow">
									<strong>{e.role}</strong>
									<span class="mono per">{e.period}</span>
								</div>
								<span class="org acid">{e.org}</span>
								<p class="enote">{e.note}</p>
							</li>
						{/each}
					</ul>
				</div>

				<div class="block" use:reveal={{ delay: 80 }}>
					<span class="mono lbl">Toolkit</span>
					<div class="stack">
						{#each stack as s}<span class="tag mono">{s}</span>{/each}
					</div>
				</div>

				<div class="block portrait" use:reveal={{ delay: 120 }}>
					<div class="ava">{profile.name.split(' ').map((n) => n[0]).join('')}</div>
					<div>
						<strong>{profile.name}</strong>
						<p class="mono loc">{profile.location}</p>
					</div>
				</div>
			</aside>
		</div>
	</div>
</section>

<style>
	.about {
		padding-block: clamp(5rem, 14vh, 10rem);
	}
	.head {
		margin-bottom: 2rem;
	}
	.statement {
		font-family: var(--font-display);
		font-weight: 400;
		font-size: clamp(1.8rem, 4.2vw, 3.6rem);
		line-height: 1.15;
		letter-spacing: -0.01em;
		max-width: 20ch;
		margin-bottom: clamp(3rem, 8vh, 6rem);
	}
	.statement .serif {
		font-style: italic;
	}

	.grid {
		display: grid;
		grid-template-columns: 1.2fr 1fr;
		gap: clamp(2rem, 5vw, 5rem);
	}
	.caps {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1px;
		background: var(--rule);
		border: 1px solid var(--rule);
	}
	.cap {
		background: var(--ink);
		padding: clamp(1.5rem, 3vw, 2.4rem);
		display: grid;
		gap: 0.7rem;
		align-content: start;
		transition: background 0.4s var(--ease);
	}
	.cap:hover {
		background: var(--ink-3);
	}
	.cap .k {
		color: var(--acid);
		font-size: 0.85rem;
	}
	.cap h3 {
		font-family: var(--font-display);
		font-size: clamp(1.4rem, 2.4vw, 2rem);
		font-weight: 400;
		line-height: 1.05;
	}
	.cap p {
		font-size: 0.95rem;
		color: var(--bone-dim);
		line-height: 1.5;
	}

	.rail {
		display: grid;
		gap: 1.4rem;
		align-content: start;
	}
	.block {
		border: 1px solid var(--rule);
		border-radius: 10px;
		padding: 1.4rem;
	}
	.lbl {
		display: block;
		color: var(--bone-faint);
		margin-bottom: 1.1rem;
		font-size: 0.66rem;
	}
	.exp {
		list-style: none;
		display: grid;
		gap: 1.3rem;
	}
	.exp li {
		display: grid;
		gap: 0.25rem;
		padding-bottom: 1.3rem;
		border-bottom: 1px solid var(--rule);
	}
	.exp li:last-child {
		border-bottom: 0;
		padding-bottom: 0;
	}
	.erow {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: 1rem;
	}
	.erow strong {
		font-weight: 600;
		font-size: 1rem;
	}
	.per {
		font-size: 0.66rem;
		color: var(--bone-faint);
		white-space: nowrap;
	}
	.org {
		font-family: var(--font-display);
		font-style: italic;
		font-size: 1.1rem;
	}
	.enote {
		font-size: 0.86rem;
		color: var(--bone-dim);
		line-height: 1.45;
		margin-top: 0.2rem;
	}
	.stack {
		display: flex;
		flex-wrap: wrap;
		gap: 0.45rem;
	}
	.tag {
		font-size: 0.66rem;
		padding: 0.4rem 0.7rem;
		border: 1px solid var(--rule);
		border-radius: 100px;
		color: var(--bone-dim);
		transition: all 0.25s var(--ease);
	}
	.tag:hover {
		border-color: var(--acid);
		color: var(--acid);
	}
	.portrait {
		display: flex;
		align-items: center;
		gap: 1rem;
	}
	.ava {
		width: 54px;
		height: 54px;
		flex: none;
		display: grid;
		place-items: center;
		border-radius: 50%;
		background: linear-gradient(135deg, var(--acid), var(--acid-deep));
		color: var(--ink);
		font-family: var(--font-mono);
		font-weight: 700;
		font-size: 1rem;
	}
	.portrait strong {
		font-weight: 600;
	}
	.loc {
		font-size: 0.66rem;
		color: var(--bone-faint);
		margin-top: 0.2rem;
	}

	@media (max-width: 940px) {
		.grid {
			grid-template-columns: 1fr;
		}
	}
	@media (max-width: 540px) {
		.caps {
			grid-template-columns: 1fr;
		}
	}
</style>
