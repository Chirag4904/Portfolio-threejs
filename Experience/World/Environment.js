import * as THREE from "three";
import Experience from "../Experience";
export default class Environment {
	constructor() {
		this.experience = new Experience();
		this.scene = this.experience.scene;

		this.sunLight = new THREE.DirectionalLight(0xffffff, 2);
		this.sunLight.position.set(-1.5, 2, 3);
		const helper = new THREE.DirectionalLightHelper(this.sunLight, 5);
		this.scene.add(helper);
		this.sunLight.castShadow = true;
		this.sunLight.shadow.camera.far = 20;
		this.sunLight.shadow.mapSize.set(2048, 2048);
		this.sunLight.shadow.normalBias = 0.05;

		this.scene.add(this.sunLight);

		this.ambientLight = new THREE.AmbientLight("#fff", 0.9);
		this.scene.add(this.ambientLight);
	}
}
