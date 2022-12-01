import * as THREE from "three";
import GSAP from "gsap";
import Experience from "../Experience";

import { ScrollTrigger } from "gsap/ScrollTrigger";
export default class Controls {
	constructor() {
		this.experience = new Experience();
		this.scene = this.experience.scene;
		this.sizes = this.experience.sizes;
		this.resources = this.experience.resources;
		this.time = this.experience.time;
		this.camera = this.experience.camera;
		this.room = this.experience.world.room.finalRoom;
		// console.log(this.room.children);
		this.room.children.forEach((child) => {
			if (child.type === "RectAreaLight") {
				this.rectLight = child;
			}
			// if (child.type === "PointLight") {
			// 	this.pointLight = child;
			// }
		});
		// console.log(this.pointLight);
		GSAP.registerPlugin(ScrollTrigger);

		this.setScrollTrigger();

		// this.progress = 0;
		// this.position = new THREE.Vector3(0, 0, 0);
		// this.lookAtPosition = new THREE.Vector3(0, 0, 0);

		// this.directionalVector = new THREE.Vector3(0, 0, 0);
		// this.staticVector = new THREE.Vector3(0, 1, 0);
		// this.crossVector = new THREE.Vector3(0, 0, 0);

		// Linear interpolation, or “lerp” for short, is a technique commonly used when programming things like games or GUIs. In principle, a lerp function “eases” the transition between two values over time, using some simple math
		// this.lerp = {
		// 	current: 0,
		// 	target: 0,
		// 	ease: 0.1,
		// };
	}

	setScrollTrigger() {
		let mm = GSAP.matchMedia();

		mm.add("(min-width: 969px)", () => {
			// desktop setup code here...
			this.room.scale.set(0.11, 0.11, 0.11);
			this.rectLight.width = 0.5;
			this.rectLight.height = 0.7;

			//FIRST SECTION ----------------------------------------->
			this.firstMoveTimeline = new GSAP.timeline({
				scrollTrigger: {
					trigger: ".first-move",
					start: "top top",
					bottom: "bottom bottom",
					scrub: 0.6,
					invalidateOnRefresh: true,
				},
			});
			this.firstMoveTimeline.to(this.room.position, {
				x: () => {
					return this.sizes.width * 0.0014;
				},
			});

			//SECOND SECTION ----------------------------------------->
			this.secondMoveTimeline = new GSAP.timeline({
				scrollTrigger: {
					trigger: ".second-move",
					start: "top top",
					bottom: "bottom bottom",
					scrub: 0.6,
					markers: true,
					invalidateOnRefresh: true,
				},
			})
				.to(this.room.position, {
					x: () => {
						return 0;
					},
					z: () => {
						return this.sizes.height * 0.0032;
					},
				})
				//REFERENCE -> https://greensock.com/docs/v3/GSAP/Timeline
				//"<" The start of previous animation**. Think of < as a pointer back to the start of the previous animation.
				.to(
					this.room.scale,
					{
						x: 0.4,
						y: 0.4,
						z: 0.4,
					},
					"<"
				)
				.to(
					this.rectLight,
					{
						width: 0.5 * 4,
						height: 0.7 * 4,
					},
					"<"
				);

			//THIRD SECTION ----------------------------------------->
			this.thirdMoveTimeline = new GSAP.timeline({
				scrollTrigger: {
					trigger: ".third-move",
					start: "top top",
					bottom: "bottom bottom",
					scrub: 0.6,
					invalidateOnRefresh: true,
				},
			});
			this.thirdMoveTimeline.to(this.camera.orthographicCamera.position, {
				y: 1.5,
				x: -4.1,
			});
		});

		mm.add("(max-width: 968px)", () => {
			// mobile setup code here...
			this.room.position.set(0, 0, 0);
			this.room.scale.set(0.07, 0.07, 0.07);
			this.rectLight.width = 0.3;
			this.rectLight.height = 0.4;
			//FIRST SECTION ----------------------------------------->
			this.firstMoveTimeline = new GSAP.timeline({
				scrollTrigger: {
					trigger: ".first-move",
					start: "top top",
					bottom: "bottom bottom",
					scrub: 0.6,
					invalidateOnRefresh: true,
				},
			}).to(this.room.scale, {
				x: 0.1,
				y: 0.1,
				z: 0.1,
			});

			//SECOND SECTION ----------------------------------------->
			this.secondMoveTimeline = new GSAP.timeline({
				scrollTrigger: {
					trigger: ".second-move",
					start: "top top",
					bottom: "bottom bottom",
					scrub: 0.6,
					markers: true,
					invalidateOnRefresh: true,
				},
			});

			//THIRD SECTION ----------------------------------------->
			this.thirdMoveTimeline = new GSAP.timeline({
				scrollTrigger: {
					trigger: ".third-move",
					start: "top top",
					bottom: "bottom bottom",
					scrub: 0.6,
					invalidateOnRefresh: true,
				},
			}).to(this.room.position, {
				z: -4.5,
			});
		});

		mm.add("(min-width: 1px)", () => {
			console.log("hfehfh");
			this.thirdMoveTimeline = new GSAP.timeline({
				scrollTrigger: {
					trigger: ".third-move",
					start: "top top",
					bottom: "bottom bottom",
					scrub: 0.6,
					invalidateOnRefresh: true,
				},
			});

			//might look to transform Object in threejs for moving mesh here and there for tweaking
			// this.room.children.forEach((child) => {
			// 	if (child.name === "Mini_Floor") {
			// 		this.thirdMoveTimeline.to(child.position, {
			// 			x: -5.44,
			// 			z: 13.61,
			// 			duration: 0.3,
			// 		});
			// 	}
			// });
		});
	}

	// setScrollTrigger() {
	// 	this.timeline = new GSAP.timeline();
	// 	this.timeline.to(this.room.position, {
	// 		//to update on resize a callback function is needed and invalidateOnRefresh needs to be true
	// 		x: () => {
	// 			return this.sizes.width * 0.0015;
	// 		},
	// 		scrollTrigger: {
	// 			trigger: ".first-move",
	// 			markers: true,
	// 			start: "top top",
	// 			end: "bottom bottom",
	// 			scrub: 0.6,
	// 			invalidateOnRefresh: true,
	// 		},
	// 	});
	// }
	//USED TO CREATE PATH FOR CAMERA OR MANY OTHER THINGS
	// setPath() {
	// 	//generating a curve
	// 	this.curve = new THREE.CatmullRomCurve3(
	// 		[
	// 			new THREE.Vector3(-5, 0, 0),
	// 			new THREE.Vector3(0, 0, -5),
	// 			new THREE.Vector3(5, 0, 0),
	// 			new THREE.Vector3(0, 0, 5),
	// 		],
	// 		true
	// 	);

	// 	//for visualizing the curve
	// 	const points = this.curve.getPoints(50);
	// 	const geometry = new THREE.BufferGeometry().setFromPoints(points);

	// 	const material = new THREE.LineBasicMaterial({ color: 0xff0000 });

	// 	// Create the final object to add to the scene
	// 	const curveObject = new THREE.Line(geometry, material);
	// 	this.scene.add(curveObject);
	// }

	// Handles the mouse wheel event and what action to take
	// onWheel() {
	// 	window.addEventListener("wheel", (e) => {
	// 		if (e.deltaY > 0) {
	// 			this.lerp.target += 0.01;
	// 			this.back = false;
	// 		} else {
	// 			this.lerp.target -= 0.01;
	// 			this.back = true;
	// 		}
	// 	});
	// }

	update() {
		// this.lerp.current = gsap.utils.interpolate(
		// 	this.lerp.current,
		// 	this.lerp.target,
		// 	this.lerp.ease
		// );
		//THIS SECTION HELPS IF CAMERA HAS TO LOOK IN OUTSIDE OR INSIDE DIRECTION
		// this.curve.getPointAt(this.lerp.current % 1, this.position);
		// this.curve.getPointAt(this.lerp.current + 0.0001, this.lookAtPosition);
		// this.camera.orthographicCamera.position.copy(this.position);
		// this.directionalVector.subVectors(this.lookAtPosition, this.position);
		// this.directionalVector.normalize();
		// this.crossVector.crossVectors(this.directionalVector, this.staticVector);
		// this.crossVector.multiplyScalar(1000000);
		// this.camera.orthographicCamera.lookAt(this.crossVector);
		//THIS SECTION HELPS WHEN CAMERA IS LOOKING AT THE PATH ITSELF
		// if (this.back) {
		// 	this.lerp.target -= 0.0001;
		// } else {
		// 	this.lerp.target += 0.0001;
		// }
		// this.lerp.target = gsap.utils.clamp(0, 1, this.lerp.target);
		// this.lerp.current = gsap.utils.clamp(0, 1, this.lerp.current);
		// //traversing the curve by copying its position at every frame and applying it to the camera
		// this.curve.getPointAt(this.lerp.current, this.position);
		// this.curve.getPointAt(this.lerp.current + 0.0001, this.lookAtPosition);
		// // this.progress -= 0.001;
		// this.camera.orthographicCamera.position.copy(this.position);
		// this.camera.orthographicCamera.lookAt(this.lookAtPosition);
	}
}
