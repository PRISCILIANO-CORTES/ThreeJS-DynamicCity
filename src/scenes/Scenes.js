import { AmbientLight,
	BoxGeometry, Color,
	DirectionalLight, FogExp2, FontLoader, Geometry,
	Matrix4, Mesh, MeshPhongMaterial,
	Scene,
	TextGeometry} from "three";
import { Cilindre } from "../objects/Cilindre";
import { Cube } from "../objects/Cube";

import { HelvetikerFontPath } from "three/examples/fonts/helvetiker_regular.typeface.json";

let firstLetter = true;

			let text = 'three.js',

				bevelEnabled = true,

				font = undefined,

				fontName = 'optimer', // helvetiker, optimer, gentilis, droid sans, droid serif
				fontWeight = 'bold'; // normal bold

			const height = 20,
				size = 70,
				hover = 30,

				curveSegments = 4,

				bevelThickness = 2,
				bevelSize = 1.5;

			const mirror = true;

class Scenes extends Scene {
	constructor() {
		super();
		this.background = new Color('skyblue').convertSRGBToLinear();
		this.create();
	}

	create() {
		// this.cubeCiudad = new Cube();
		// this.cubeCiudad.position.set(600, 100, 600);
		// //this.cubeCiudad.castShadow = true;
		// this.add(this.cubeCiudad);

		this.heart = new Cilindre();
		this.heart.position.set(0, 80, 600);
		this.heart.castShadow = true;
		this.add(this.heart);

		this.geo = new BoxGeometry(2000, 2000, 1, 20, 20, 1)
		this.mat = new MeshPhongMaterial({color: 0x9db3b5});
		this.floor = new Mesh(this.geo, this.mat);

		this.floor.rotation.x = -90 * Math.PI / 180;
		this.floor.receiveShadow = true;
		this.add(this.floor);

		this.geometry = new BoxGeometry(1,1,1);

		this.geometry.applyMatrix4( new Matrix4().makeTranslation(0, 0.5, 0));
		this.material = new MeshPhongMaterial({color: 0x2b2b2b});

		this.cityGeometry = new Geometry();

		for (let i = 0; i < 300; i++) {
			this.building = new Mesh(this.geometry.clone());
			this.building.position.x = Math.floor(Math.random() * 200 - 100) * 4;
			this.building.position.z = Math.floor(Math.random() * 200 - 100) * 4;
			this.building.scale.x = Math.random() * 50 + 10;
			this.building.scale.y = Math.random() * this.building.scale.x * 8 + 8;
			this.building.scale.z = this.building.scale.x;
			this.building.updateMatrix();
			this.cityGeometry.merge(this.building.geometry, this.building.matrix);
		}

		this.city = new Mesh(this.cityGeometry, this.material);

		this.city.castShadow = true;
		this.city.receiveShadow = true;

		this.light = new DirectionalLight(0xf6e86d, 1);

		this.light.castShadow = true;
		this.light.shadow.mapSize.width = 2048;
		this.light.shadow.mapSize.height = 2048;
		this.light.position.set(500, 1500, 1000);
		this.light.shadow.camera.far = 2500;
		this.light.shadow.camera.left = -1000;
		this.light.shadow.camera.right = 1000;
		this.light.shadow.camera.top = 1000;
		this.light.shadow.camera.bottom = -1000;
		this.light.shadow.darkness = 0.2;

		const ambientLight = new AmbientLight(0x666666);
		const fog = new FogExp2(0x9db3b5, 0.002);

		this.add(fog, ambientLight);
		this.add(this.light);
		this.add(this.city);
	}

	update() {

	}
}

export default Scenes;
