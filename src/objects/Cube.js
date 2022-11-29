import { Mesh, BoxBufferGeometry, MeshStandardMaterial, Color, TextGeometry, FontLoader } from 'three';
import HelvetikerFontPath from 'three/examples/fonts/helvetiker_regular.typeface.json';


export class Cube extends Mesh {
	constructor() {
		super();

		this.cubes = document.querySelector('#cubes');

		this.geometry = new BoxBufferGeometry(100, 100, 100);
		this.material = new MeshStandardMaterial({
			color: new Color('black').convertSRGBToLinear(),
			flatShading: true,
			roughness: .5
		});

	}
}
