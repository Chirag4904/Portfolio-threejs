import Experience from "../Experience";
import * as THREE from "three";
import gsap from "gsap";

export default class Room {
	constructor() {
		this.experience = new Experience();
		this.scene = this.experience.scene;
		this.time = this.experience.time;
		this.resources = this.experience.resources;
		this.room = this.resources.items.room;
		this.finalRoom = this.room.scene;

		this.lerp = {
			current: 0,
			target: 0,
			ease: 0.1,
		};

		this.setModel();
		this.onMouseMove();
		this.setAquariumLight();
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
				child.children[1].material = new THREE.MeshBasicMaterial({
					map: this.resources.items.desktop,
				});
			}
		});

		this.scene.add(this.finalRoom);
		this.finalRoom.scale.set(0.1, 0.1, 0.1);

		this.setAnimation();
		// this.finalRoom.rotation.y = Math.PI / 4;
		// this.time.on("tick", () => {
		// 	this.update();
		// });
	}

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

	setAquariumLight() {
		const width = 0.6;
		const height = 0.7;
		const intensity = 1;
		this.rectLight = new THREE.RectAreaLight(
			0xffffff,
			intensity,
			width,
			height
		);
		this.rectLight.position.set(0.768244, 0.6, 0.08);
		this.rectLight.rotation.x = -Math.PI / 2;
		this.rectLight.rotation.z = Math.PI / 4;

		this.scene.add(this.rectLight);
	}

	update() {
		this.lerp.current = gsap.utils.interpolate(
			this.lerp.current,
			this.lerp.target,
			this.lerp.ease
		);

		this.finalRoom.rotation.y = this.lerp.current;

		this.mixer.update(this.time.deltaTime * 0.001);
	}
}
