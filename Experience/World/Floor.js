import Experience from "../Experience";
import * as THREE from "three";

export default class Floor {
	constructor() {
		this.experience = new Experience();
		this.scene = this.experience.scene;

		this.setFloor();
		this.setCircles();
	}

	setCircles() {
		const geometry = new THREE.CircleGeometry(5, 64);
		const material1 = new THREE.MeshStandardMaterial({ color: "#e5a1aa" });
		const material2 = new THREE.MeshStandardMaterial({ color: "#8395cd" });
		const material3 = new THREE.MeshStandardMaterial({ color: "#7ad0ac" });
		this.circle1 = new THREE.Mesh(geometry, material1);
		this.circle2 = new THREE.Mesh(geometry, material2);
		this.circle3 = new THREE.Mesh(geometry, material3);
		this.circle1.position.y = -0.29;
		this.circle2.position.y = -0.28;
		this.circle2.position.x = 2;
		this.circle3.position.y = -0.27;

		this.circle1.scale.set(0, 0, 0);
		this.circle2.scale.set(0, 0, 0);
		this.circle3.scale.set(0, 0, 0);

		this.circle1.rotation.x = -Math.PI / 2;
		this.circle2.rotation.x = -Math.PI / 2;
		this.circle3.rotation.x = -Math.PI / 2;

		this.circle1.receiveShadow = true;
		this.circle2.receiveShadow = true;
		this.circle3.receiveShadow = true;

		this.scene.add(this.circle1);
		this.scene.add(this.circle2);
		this.scene.add(this.circle3);
	}

	setFloor() {
		this.geometry = new THREE.PlaneGeometry(50, 50);
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
