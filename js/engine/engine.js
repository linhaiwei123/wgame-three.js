///<reference path="../../typings/globals/three/three.d.ts" />
///<reference path="../../typings/globals/physijs/physijs.d.ts" />

//import * as THREE from './three.min';
import * as THREE from './three.min';
import anime from './anime';
import config from './config';
import Physijs from './physi';

export default class Engine {
    /**
     * @type Physijs.Scene
     */
    scene = null;
    /**
     * @type THREE.Camera
     */
    mainCamera = null;
    clock = null;
    /**
     * @type THREE.Object3D
     */
    scene = null;
    /**
     * @type THREE.Raycaster
     */
    raycaster = null;
    /**
     * @type THREE.Component
     */
    sceneCtrl = null;
    constructor() {
        this.polyfill();
        this.onLoad();
    }

    //
    onLoad() {
        Physijs.scripts.worker = 'workers/request/physijs_worker.js';  

        //this.scene = new THREE.Scene();  
        this.scene = new Physijs.Scene();  
        this.scene.setGravity(new THREE.Vector3(0,-10,0)); 
         

        this.renderer = new THREE.WebGLRenderer({  
            canvas: canvas
        });  
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.initTouchEventListener();
        this.loadScene(require(config.entry).default);
        this.raycaster = new THREE.Raycaster();
        this.clock = new THREE.Clock();
        this.mainLoop();
    }

    initTouchEventListener() {
        canvas.addEventListener('touchstart',this._onReceiveTouchEvent.bind(this));
        canvas.addEventListener('touchmove',this._onReceiveTouchEvent.bind(this));
        canvas.addEventListener('touchend',this._onReceiveTouchEvent.bind(this));
        canvas.addEventListener('touchcancel',this._onReceiveTouchEvent.bind(this));
    }
    
    _onReceiveTouchEvent(event) {
       let originType = event.type;
       let touches = event.changedTouches;
       event.type = 'raycast'
       event.touchType = originType;
       for(let i = 0,l = touches.length; i < l ;i++) {
           if(this.mainCamera){
            let coordX = (touches[i].clientX / window.innerWidth) * 2 - 1;
            let coordY = -(touches[i].clientY / window.innerHeight) * 2 + 1;
            this.raycaster.setFromCamera({x:coordX,y:coordY},this.mainCamera);
            let intersects = this.raycaster.intersectObjects(this.scene.children,true);
            for(let intersect of intersects) {
                intersect.object.dispatchEvent(event);
            }
           }
       }
       event.type = originType;
       delete event.touchType;
       this.scene && this.scene.dispatchEvent(event);
    }

    _dt = 0;
    mainLoop() {
        const render = () => {
            this._dt = this.clock.getDelta();
            this.update(this._dt);
            this.scene.simulate();
            this.mainCamera && this.renderer.render(this.scene,this.mainCamera);
            window.requestAnimationFrame(render,canvas);
        }
        render();
    }

    //
    polyfill() {
        window.THREE = THREE;
        window.engine = this;
        window.anime = anime;
        window.Physijs = Physijs;
        THREE.Object3D.prototype.addComponent = function(classConstructor) {
            let instance = new classConstructor();
            instance.object = this;
            this.components = this.components || [];
            this.components.push(instance);
            return instance;
        };
        THREE.Object3D.prototype.removeComponent = function(classConstructor) {
            this.components = this.components || [];
            let components = this.components;
			for(let i = components.length - 1,l = 0; i >= l; i--) {
                let comp = components[i];
				if(comp instanceof classConstructor) {
					let idx = components.indexOf(comp);
					if(idx !== -1){
						let instance = components.splice(idx,1);
                        instance.object = null;
                        return instance;
					}
				}
            }
            return null;
        };
        THREE.Object3D.prototype.getComponent = function(classConstructor) {
            this.components = this.components || [];
            let components = this.components;
			for(let i = components.length - 1,l = 0; i >= l; i--) {
                let comp = components[i];
				if(comp instanceof classConstructor) {
					return comp;
				}
            }
            return null;
        }
        THREE.Component = class Component {
            _isOnLoadCalled = false;
            enabled = true;
            object = null;
            onLoad() {
                
            }
            update(dt) {

            }
        }
    }
    //
    _queue = [];
    _subQueue = null;
    update(dt) {
        this._queue[0] = [this.scene];
        for(this._subQueue of this._queue){
            for(let child of this._subQueue) {
                if(child._physijs){
                    child.__dirtyPosition = true;
                    child.__dirtyRotation = true;
                }
                if(!child.components)continue;
                for(let comp of child.components) {
                    if(!comp._isOnLoadCalled){
                        comp._isOnLoadCalled = true;
                        comp.onLoad();
                    }else{
                        if(comp.enabled) {
                            comp.update(dt);
                        }
                    }
                }
                if(child.children.length) {
                    this._queue[this._queue.length] = child.children;
                }
            }
        }
        this._queue.length = 0;
        this._subQueue = null;
    }

    //
    loadScene(Scene) {
        for(let i = this.scene.children.length - 1,l = 0;i >=l;i--) {
            this.scene.remove(this.scene.children[i]);
        }
        
        this.scene.components = [];
        if(this.scene._listener !== undefined){
            this.scene._listener['touchstart'] = [];
            this.scene._listener['touchmove'] = [];
            this.scene._listener['touchend'] = [];
            this.scene._listener['touchcancel'] = [];
        }
        this.mainCamera = null;
        this.sceneCtrl = this.scene.addComponent(Scene);
        wx && wx.triggerGC();
    }

}