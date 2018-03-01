export default class CameraCtrl extends THREE.Component {
    _theta = 0;
    onLoad() {
        
    }

    update(dt) {
        // this._theta++;
        let camera = this.object;
        camera.position.x = Math.sin(this._theta * Math.PI/180);
        camera.position.y = Math.sin(this._theta * Math.PI/180);
        camera.position.z = Math.cos(this._theta * Math.PI/180);
        camera.position.normalize().multiplyScalar(5);
        camera.lookAt(this.object.parent.children[3].position);
    }
}