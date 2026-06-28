<!--
  Static film-grain overlay built from an inline SVG turbulence filter.
  Sits above the page, ignores pointer events, costs nothing to animate.
-->
<div class="grain" aria-hidden="true"></div>

<style>
	.grain {
		position: fixed;
		inset: -50%;
		width: 200%;
		height: 200%;
		z-index: 9000;
		pointer-events: none;
		opacity: 0.04;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
		animation: drift 0.6s steps(3) infinite;
	}
	@keyframes drift {
		0% {
			transform: translate(0, 0);
		}
		33% {
			transform: translate(-4%, 2%);
		}
		66% {
			transform: translate(3%, -3%);
		}
		100% {
			transform: translate(0, 0);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.grain {
			animation: none;
		}
	}
</style>
