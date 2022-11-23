import Experience from "../Experience";
import * as THREE from "three";
export default class Room {
	constructor() {
		this.experience = new Experience();
		this.scene = this.experience.scene;
		this.time = this.experience.time;
		this.resources = this.experience.resources;
		this.room = this.resources.items.room;
		this.finalRoom = this.room.scene;
		console.log(this.room);
		this.setModel();
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
		this.time.on("tick", () => {
			this.update();
		});
	}

	setAnimation() {
		this.mixer = new THREE.AnimationMixer(this.finalRoom);
		this.swim = this.mixer.clipAction(this.room.animations[0]);
		this.swim.play();
	}

	update() {
		this.mixer.update(this.time.deltaTime * 0.001);
	}
}
