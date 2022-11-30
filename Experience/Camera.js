import Experience from "./Experience";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import GUI from "lil-gui";
export default class Camera {
	constructor() {
		this.experience = new Experience();
		this.sizes = this.experience.sizes;
		this.scene = this.experience.scene;
		this.canvas = this.experience.canvas;

		this.createPerspectiveCamera();
		this.createOrthographicCamera();
		this.setOrbitControls();
		// this.setGui();

		// const size = 20;
		// const divisions = 20;
		// const gridHelper = new THREE.GridHelper(size, divisions);
		// this.scene.add(gridHelper);

		// const axesHelper = new THREE.AxesHelper(5);
		// this.scene.add(axesHelper);
	}

	setGui() {
		this.gui = new GUI({ container: document.querySelector(".hero-main") });
		this.obj = {
			colorObj: { r: 0, g: 0, b: 0 },
			intensity: 3,
			position: { x: 4, y: 4, z: 0 },
		};

		this.gui.add(this.obj.position, "x", -10, 10).onChange(() => {
			this.orthographicCamera.position.x = this.obj.position.x;
		});
		this.gui.add(this.obj.position, "y", -10, 10).onChange(() => {
			this.orthographicCamera.position.y = this.obj.position.y;
		});
		this.gui.add(this.obj.position, "z", -10, 10).onChange(() => {
			this.orthographicCamera.position.z = this.obj.position.z;
		});
	}

	createPerspectiveCamera() {
		this.perspectiveCamera = new THREE.PerspectiveCamera(
			35,
			this.sizes.aspect,
			0.1,
			1000
		);

		this.perspectiveCamera.position.x = 18;
		this.perspectiveCamera.position.y = 4;
		this.perspectiveCamera.position.z = 24;
		this.scene.add(this.perspectiveCamera);
	}

	createOrthographicCamera() {
		this.orthographicCamera = new THREE.OrthographicCamera(
			(-this.sizes.aspect * this.sizes.frustrum) / 2,
			(this.sizes.aspect * this.sizes.frustrum) / 2,
			this.sizes.frustrum / 2,
			-this.sizes.frustrum / 2,
			-50,
			50
		);

		this.orthographicCamera.position.y = 4;
		this.orthographicCamera.position.z = 5;

		this.orthographicCamera.rotation.x = -Math.PI / 6;

		this.scene.add(this.orthographicCamera);
		// this.helper = new THREE.CameraHelper(this.orthographicCamera);
		// this.scene.add(this.helper);
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
		this.controls = new OrbitControls(this.orthographicCamera, this.canvas);
		this.controls.enableDamping = true;
		this.controls.enableZoom = true;
	}

	update() {
		// console.log(this.perspectiveCamera.position);
		this.controls.update();
		// this.helper.matrixWorldNeedsUpdate = true;
		// this.helper.update();
		// this.helper.position.copy(this.orthographicCamera.position);
		// this.helper.rotation.copy(this.orthographicCamera.rotation);
	}
}
