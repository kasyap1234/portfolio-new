// ------------------------------------------------------------
// Reusable Svelte actions (use:reveal / use:magnetic)
// ------------------------------------------------------------

const reduced =
	typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

type RevealOpts = { delay?: number; y?: number };

/** Fade + rise an element into view once it enters the viewport. */
export function reveal(node: HTMLElement, opts: RevealOpts = {}) {
	const { delay = 0, y = 26 } = opts;

	if (reduced) return {};

	node.style.opacity = '0';
	node.style.transform = `translate3d(0, ${y}px, 0)`;
	node.style.transition = `opacity .95s var(--ease-out) ${delay}ms, transform 1.05s var(--ease-out) ${delay}ms`;
	node.style.willChange = 'opacity, transform';

	const io = new IntersectionObserver(
		(entries) => {
			for (const e of entries) {
				if (e.isIntersecting) {
					node.style.opacity = '1';
					node.style.transform = 'translate3d(0,0,0)';
					io.unobserve(node);
				}
			}
		},
		{ threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
	);
	io.observe(node);

	return { destroy: () => io.disconnect() };
}

/** Pull an element gently toward the cursor while hovered. */
export function magnetic(node: HTMLElement, strength = 0.35) {
	if (reduced || !matchMedia('(pointer:fine)').matches) return {};

	function move(e: MouseEvent) {
		const r = node.getBoundingClientRect();
		const x = (e.clientX - (r.left + r.width / 2)) * strength;
		const y = (e.clientY - (r.top + r.height / 2)) * strength;
		node.style.transform = `translate(${x}px, ${y}px)`;
	}
	function reset() {
		node.style.transition = 'transform .5s var(--ease-out)';
		node.style.transform = 'translate(0,0)';
	}
	function enter() {
		node.style.transition = 'transform .08s linear';
	}

	node.addEventListener('mouseenter', enter);
	node.addEventListener('mousemove', move);
	node.addEventListener('mouseleave', reset);

	return {
		destroy() {
			node.removeEventListener('mouseenter', enter);
			node.removeEventListener('mousemove', move);
			node.removeEventListener('mouseleave', reset);
		}
	};
}
