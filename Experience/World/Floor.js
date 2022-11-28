import Experience from "../Experience";
import * as THREE from "three";

export default class Floor {
	constructor() {
		this.experience = new Experience();
		this.scene = this.experience.scene;

		this.setFloor();
	}

	setFloor() {
		this.geometry = new THREE.PlaneGeometry(20, 20);
		this.material = new THREE.MeshStandardMaterial({ color: 0xffffff });
		this.plane = new THREE.Mesh(this.geometry, this.material);
		this.plane.rotation.x = -Math.PI / 2;
		this.plane.position.y = -0.3;
		this.plane.castShadow = true;
		this.plane.receiveShadow = true;
		this.scene.add(this.plane);
	}

	update() {}
}