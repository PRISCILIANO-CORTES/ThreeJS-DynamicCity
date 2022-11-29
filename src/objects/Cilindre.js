import { Mesh, MeshStandardMaterial, Color, ConeGeometry } from 'three';

export class Cilindre extends Mesh {
	constructor() {
		super();

		this.geometry = new ConeGeometry(130, 155, 180);
		this.material = new MeshStandardMaterial({
			color: new Color('blue').convertSRGBToLinear(),
			flatShading: true,
			roughness: .5
		});

	}
}
