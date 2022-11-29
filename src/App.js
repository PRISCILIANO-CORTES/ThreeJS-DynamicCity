import { PerspectiveCamera, Vector3, WebGLRenderer, sRGBEncoding, Clock, Raycaster, Vector2 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls';
import Scenes from './scenes/Scenes';

let INTERSECTED;

export class App {
	constructor(container) {
		this.container = container;

		this.scene = new Scenes();

		// ## Camera's config
		this.camera = new PerspectiveCamera(75, this.container.clientWidth / this.container.clientHeight, 1, 10000);
		//this.camera.position.set(400, 700, 10);
		this.camera.position.y = 400;
		this.camera.position.z = 700;
		this.camera.rotation.x = -30 * Math.PI / 180;
		this.camera.lookAt(new Vector3(0, 0, 0));

		const controls = new OrbitControls(this.camera, this.container);

		// ## Renderer's config
		this.renderer = new WebGLRenderer({
			antialias: true,
		})
		this.renderer.setPixelRatio(window.devicePixelRatio);

		// sRGBEncoding
		this.renderer.outputEncoding = sRGBEncoding;

		// ## Light's config
		this.renderer.physicallyCorrectLights = true;

		this.renderer.setSize(window.innerWidth, window.innerHeight);

		this.renderer.shadowMap.enabled = true;
		this.renderer.shadowMap.soft = true;
		this.renderer.setClearColor( 0x7EC0EE, 1);

		this.clock = new Clock();
		this.controls = new FirstPersonControls(this.camera);
		this.controls.movementSpeed = 100;
		this.controls.lookSpeed = 0.3;

		this.container.appendChild(this.renderer.domElement);

		this.onResize();
		this.render();

		this.raycaster = new Raycaster();
 		this.mouse = new Vector2()

		window.addEventListener('mousemove', () => {
			this.onPointerMove(event);
		}, false);
	}

	onResize() {
		this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
		this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
		this.camera.updateProjectionMatrix();
	}

	render() {

		this.renderer.render(this.scene, this.camera);

		// Updates here
		this.scene.update();

		this.renderer.setAnimationLoop(() => this.render());
	}

	onPointerMove( event ) {
		event.preventDefault();

		this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
		this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

		this.raycaster.setFromCamera( this.mouse, this.camera );

		const intersects = this.raycaster.intersectObjects( this.scene.children, false );

		if ( intersects.length > 0 ) {
			if ( INTERSECTED != intersects[ 0 ].object ) {
				if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
				INTERSECTED = intersects[ 0 ].object;
				INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
				INTERSECTED.material.emissive.setHex( 0xff0000 );
			}
		} else {
			if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
			INTERSECTED = null;
		}

		// this.raycaster.setFromCamera(this.mouse, this.camera);

		// const intersects = this.raycaster.intersectObject(this.scene, true);

		// if (intersects.length > 0) {
		// 	const object = intersects[0].object;

		//   	object.material.color.set( Math.random() * 0xffffff );
		// } else {
		// 	object.material.color.set( 0xffffff );
		// }
	}
}
