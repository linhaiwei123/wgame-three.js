declare namespace engine {
    export function loadScene<T extends {constructor:T}>(SceneController:T):void;
    export let scene: THREE.Scene;
    export let mainCamera: THREE.Camera;
    export let clock: THREE.Clock;
    export let sceneCtrl: THREE.Component;
}