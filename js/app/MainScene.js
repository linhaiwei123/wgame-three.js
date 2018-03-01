import CubeCtrl from './CubeCtrl';
import CameraCtrl from './CameraCtrl';
export default class MainScene extends THREE.Component{
    onLoad() {
        this.initScene();
    }

    initScene() {
        let camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
        engine.mainCamera = camera;
        this.object.add(camera);
        camera.addComponent(CameraCtrl);

        for(let i = 0,l = 10; i < l; i++) {
            let geometry = new THREE.BoxGeometry(1,1,1);
            let material = new THREE.MeshBasicMaterial({
                color:0xffffff * Math.random()
            })
            let mesh = new Physijs.BoxMesh(geometry,material);
            //let mesh = new THREE.Mesh(geometry,material);

            this.object.add(mesh);
            mesh.name = 'Cube';
            mesh.addComponent(CubeCtrl);

            mesh.position.x = (Math.random()-0.5) * 5;
            mesh.position.y = (Math.random()-0.5) * 5;
            mesh.position.z = (Math.random()-0.5) * 5;
        }

        let geometry = new THREE.BoxGeometry(30, 1, 30);  
        let material = new THREE.MeshBasicMaterial({ color: 0xffffff });  
        let cylinder = new Physijs.BoxMesh (geometry, material, 0);  
        cylinder.position.y = -10;  
        cylinder.position.x = 0.5  
        this.object.add(cylinder);

         let geometry2 = new THREE.PlaneGeometry(0.1,0.1);  
         let material2 = new THREE.MeshBasicMaterial({ color: 0xff00ff });  
         let ui = new THREE.Mesh (geometry2, material2);  
         ui.position.y = 0.3;  
         ui.position.x = 0.3;  
         ui.position.z = -1;
         let uiAnime = null;
         ui.addEventListener('raycast',(e) => {
             if(e.touchType === 'touchstart'){
             uiAnime && uiAnime.pause();
             uiAnime = anime({
                 targets:ui.rotation,
                 //x:Math.PI * 2 + ui.rotation.x,
                 //y:Math.PI * 2 + ui.rotation.y,
                 z:Math.PI * 2 + ui.rotation.z,
                 duration : 1 * 1000
             })
            }
         })
         engine.mainCamera.add(ui);

        setTimeout(() => {
            engine.loadScene(MainScene);
        },10000);
    }

    update(dt) {
        
    }
}