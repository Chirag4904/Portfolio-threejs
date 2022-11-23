import Experience from "../Experience";
import * as THREE from "three";
export default class Room {
	constructor() {
		this.experience = new Experience();
		this.scene = this.experience.scene;
		this.setRoom();
	}
	setRoom() {
		this.room = new THREE.Mesh(
			new THREE.BoxBufferGeometry(1, 1, 1),
			new THREE.MeshBasicMaterial({ color: 0xff0000 })
		);
		this.scene.add(this.room);
	}
}
