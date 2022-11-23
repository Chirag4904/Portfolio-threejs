import Experience from "./Experience";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
export default class Camera {
	constructor() {
		this.experience = new Experience();
		this.sizes = this.experience.sizes;
		this.scene = this.experience.scene;
		this.canvas = this.experience.canvas;

		this.createPerspectiveCamera();
		this.createOrthographicCamera();
		this.setOrbitControls();
		const size = 5;
		const divisions = 5;

		const gridHelper = new THREE.GridHelper(size, divisions);
		this.scene.add(gridHelper);

		const axesHelper = new THREE.AxesHelper(5);
		this.scene.add(axesHelper);
	}

	createPerspectiveCamera() {
		this.perspectiveCamera = new THREE.PerspectiveCamera(
			35,
			this.sizes.aspect,
			0.1,
			1000
		);
		this.perspectiveCamera.position.z = 10;
		this.scene.add(this.perspectiveCamera);
	}

	createOrthographicCamera() {
		this.orthographicCamera = new THREE.OrthographicCamera(
			(-this.sizes.aspect * this.sizes.frustrum) / 2,
			(this.sizes.aspect * this.sizes.frustrum) / 2,
			this.sizes.frustrum / 2,
			-this.sizes.frustrum / 2,
			-100,
			100
		);
	}

	resize() {
		//update perspective Camera
		this.perspectiveCamera.aspect = this.sizes.aspect;
		this.perspectiveCamera.updateProjectionMatrix();

		//update orthographic Camera
		this.orthographicCamera.left =
			(-this.sizes.aspect * this.sizes.frustrum) / 2;
		this.orthographicCamera.right =
			(this.sizes.aspect * this.sizes.frustrum) / 2;
		this.orthographicCamera.top = this.sizes.frustrum / 2;
		this.orthographicCamera.bottom = -this.sizes.frustrum / 2;
		this.orthographicCamera.updateProjectionMatrix();
	}

	setOrbitControls() {
		this.controls = new OrbitControls(this.perspectiveCamera, this.canvas);
		this.controls.enableDamping = true;
	}

	update() {
		this.controls.update();
	}
}
