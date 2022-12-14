import Experience from "../Experience";
import * as THREE from "three";
import gsap from "gsap";
import GUI from "lil-gui";
export default class Room {
	constructor() {
		this.experience = new Experience();
		this.scene = this.experience.scene;
		this.time = this.experience.time;
		this.resources = this.experience.resources;
		this.room = this.resources.items.room;
		this.finalRoom = this.room.scene;
		this.roomChildren = {};

		this.lerp = {
			current: 0,
			target: 0,
			ease: 0.1,
		};

		this.setModel();
		this.onMouseMove();
		this.setObjectLights();
		// this.setGui();
	}
	setModel() {
		//traversing each child mesh or group and casting shadow from them
		this.finalRoom.children.forEach((child) => {
			child.castShadow = true;
			child.receiveShadow = true;
			//using inbuilt type instead of instance of
			//reason not clear but maybe methodology changed
			if (child.type == "Group") {
				child.children.forEach((gchild) => {
					// console.log(gchild);
					gchild.castShadow = true;
					gchild.receiveShadow = true;
				});
			}
			// console.log(child);
			// if (child.name === "Shelves") {
			// 	console.log(child.children[1]);
			// }

			if (child.name === "Aquarium") {
				child.children[0].material = new THREE.MeshPhysicalMaterial();
				child.children[0].material.roughness = 0;
				child.children[0].material.color.set(0x549dd2);
				child.children[0].material.ior = 3;
				child.children[0].material.transmission = 1;
				child.children[0].material.opacity = 1;
			}
			// console.log(child);
			if (child.name === "Computer") {
				this.computerScreen = child.children[1];
				// child.children[1].material = new THREE.MeshBasicMaterial({
				// 	map: this.resources.items.desktop,
				// });
				child.children[1].material = new THREE.MeshBasicMaterial();
				child.children[1].material.color.set(0x00000);
			}

			//setting initial scale of every mesh as 0 for the intro section to load and then scale them back
			child.scale.set(0, 0, 0);
			if (child.name === "Cube") {
				// child.scale.set(1, 1, 1);
				child.position.set(0, -1.5, 0);
				child.rotation.y = Math.PI / 4;
			}

			this.roomChildren[child.name.toLowerCase()] = child;
			// if (child.name === "Mini_Floor") {
			// 	child.position.set(-0.2895, 0, 8.83572);
			// }
		});

		this.scene.add(this.finalRoom);
		this.finalRoom.scale.set(0.1, 0.1, 0.1);

		this.setAnimation();

		this.powerOn = document.querySelector(".project ");
		// console.log(this.computerScreen);
		this.powerOn.addEventListener("click", () => {
			// const canva = this.experience.renderer.renderer.domElement;
			// const width = canva.width;

			// const height = canva.height;

			// console.log(this.computerScreen.position);
			// // this.experience.renderer.renderer.setSize(width, height, false);

			// // const tempV = new THREE.Vector3();

			// console.log(canva);
			if (this.computerScreen.material.map) {
				this.computerScreen.material.map = null;
				this.computerScreen.material.color.set(0x000000);
			} else {
				this.computerScreen.material.color.set(0xffffff);
				this.computerScreen.material.map = this.resources.items.desktop;
			}
		});
		// this.finalRoom.rotation.y = Math.PI / 4;
		// this.time.on("tick", () => {
		// 	this.update();
		// });
	}

	// turnDesktopOn(){
	// 	this.computerScreen.material.color.set(0xffffff);
	// 	this.computerScreen.material.map = this.resources.items.desktop;

	// }

	setAnimation() {
		this.mixer = new THREE.AnimationMixer(this.finalRoom);
		this.swim = this.mixer.clipAction(this.room.animations[0]);
		this.swim.play();
	}

	onMouseMove() {
		window.addEventListener("mousemove", (event) => {
			this.lerp.target =
				(event.clientX / this.experience.sizes.width - 0.5) * 2;
			this.lerp.target = this.lerp.target * 0.1;
		});
	}

	setObjectLights() {
		const width = 0.5;
		const height = 0.7;
		const intensity = 0.8;
		this.rectLight = new THREE.RectAreaLight(
			0xffffff,
			intensity,
			width,
			height
		);
		this.rectLight.position.set(7.68244, 6, 0.5);
		this.rectLight.rotation.x = -Math.PI / 2;
		this.rectLight.rotation.z = Math.PI / 4;
		//initial scale 0 so i can animate it later
		this.rectLight.scale.set(0, 0, 0);

		this.finalRoom.add(this.rectLight);
		this.roomChildren["rectLight"] = this.rectLight;

		this.lampLight = new THREE.PointLight("#080808", 0.7, 80, 1.5);
		this.lampLight.position.set(-10.02, 12.16, 1.05);
		//initial intensity is set to 0 so that animate later
		this.lampLight.intensity = 0;
		this.finalRoom.add(this.lampLight);
		this.lampLight.castShadow = false;
		this.roomChildren["lampLight"] = this.lampLight;
		// const sphereSize = 1;
		// const pointLightHelper = new THREE.PointLightHelper(
		// 	this.lampLight,
		// 	sphereSize
		// );
		// this.scene.add(pointLightHelper);
	}

	setGui() {
		this.gui = new GUI({ container: document.querySelector(".hero-main") });
		this.obj = {
			colorObj: { r: 0, g: 0, b: 0 },
			intensity: 3,
			func: () => {
				this.computerScreen.material.color.set(0xffffff);
				this.computerScreen.material.map = this.resources.items.desktop;
			},
			position: { x: -10, y: 12, z: -0.3 },
		};
		this.gui.addColor(this.obj, "colorObj").onChange(() => {
			this.lampLight.color.copy(this.obj.colorObj);
		});

		this.gui.add(this.obj, "func");

		this.gui.add(this.obj.position, "x", -15, 15).onChange(() => {
			this.lampLight.position.x = this.obj.position.x;
		});
		this.gui.add(this.obj.position, "y", -15, 15).onChange(() => {
			this.lampLight.position.y = this.obj.position.y;
		});
		this.gui.add(this.obj.position, "z", -15, 15).onChange(() => {
			this.lampLight.position.z = this.obj.position.z;
		});
	}

	update() {
		this.lerp.current = gsap.utils.interpolate(
			this.lerp.current,
			this.lerp.target,
			this.lerp.ease
		);
		// console.log(this.computerScreen.position);
		this.finalRoom.rotation.y = this.lerp.current;

		this.mixer.update(this.time.deltaTime * 0.001);
	}
}
