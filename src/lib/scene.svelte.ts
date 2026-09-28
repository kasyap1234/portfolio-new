// ------------------------------------------------------------
// Shared state for the WebGL background.
// Written by Background3D listeners, read by the Three.js scene
// graph (Scene.svelte) and light DOM consumers (hero parallax).
// ------------------------------------------------------------

type SceneState = {
	/** raw pointer, normalized -1..1 with y pointing up */
	pointer: { x: number; y: number };
	/** lerped pointer for cheap DOM transforms */
	smooth: { x: number; y: number };
	/** page scroll progress, 0..1 */
	scroll: number;
	/** prefers-reduced-motion */
	reduced: boolean;
};

export const sceneState: SceneState = $state({
	pointer: { x: 0, y: 0 },
	smooth: { x: 0, y: 0 },
	scroll: 0,
	reduced: false
});
