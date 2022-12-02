import Experience from "../Experience";
import { EventEmitter } from "events";
import * as THREE from "three";
import GSAP from "gsap";
export default class Preloader extends EventEmitter {
	constructor() {
		super();
		this.experience = new Experience();
		this.world = this.experience.world;
		this.camera = this.experience.camera;
		this.sizes = this.experience.sizes;
		this.device = this.sizes.device;
		// this.resources = this.experience.resources;

		this.sizes.on("switchDevice", (device) => {
			this.device = device;
			console.log(this.device);
		});

		this.world.on("worldReady", () => {
			this.setAssets();
			this.playIntro();
		});
	}
	setAssets() {
		this.room = this.experience.world.room.finalRoom;
		this.roomChildren = this.experience.world.room.roomChildren;
		console.log(this.roomChildren);
	}
	firstIntro() {
		return new Promise((resolve) => {
			this.timeline = new GSAP.timeline();
			if (this.device === "desktop") {
				this.timeline
					.to(this.roomChildren.cube.scale, {
						x: 1.4,
						y: 1.4,
						z: 1.4,
						ease: "back.out(2.5)",
						duration: 0.8,
					})
					.to(this.room.position, {
						x: -1,
						duration: 0.7,
						ease: "power1.out",
						onComplete: resolve,
					});
			} else {
				this.timeline
					.to(this.roomChildren.cube.scale, {
						x: 1.4,
						y: 1.4,
						z: 1.4,
						ease: "back.out(2.5)",
						duration: 0.6,
					})
					.to(this.room.position, {
						z: -1,
						duration: 0.7,
						ease: "power1.out",
						onComplete: resolve,
					});
			}
		});
	}

	secondIntro() {
		return new Promise((resolve) => {
			this.secondTimeline = new GSAP.timeline();
			if (this.device === "desktop") {
				this.secondTimeline
					.to(
						this.room.position,
						{
							x: 0,
							y: 0,
							z: 0,
							ease: "power1.out",
						},
						"<"
					)
					.to(
						this.roomChildren.cube.rotation,
						{
							y: 2 * Math.PI + Math.PI / 4,
						},
						"<"
					)
					.to(
						this.roomChildren.cube.scale,
						{
							x: 10,
							y: 10,
							z: 10,
						},
						"<"
					)
					.to(
						this.camera.orthographicCamera.position,
						{
							y: 4,
						},
						"<"
					)
					.to(
						this.roomChildren.cube.position,
						{
							x: 0.638711,
							y: 8.5618,
							z: 1.3243,
						},
						"<"
					)
					.set(this.roomChildren.body.scale, {
						x: 1,
						y: 1,
						z: 1,
					});
			} else {
				this.secondTimeline.to(this.room.position, {
					x: 0,
					y: 0,
					z: 0,
					ease: "power1.out",
					duration: 0.7,
				});
			}
		});
	}

	onScroll(e) {
		if (e.deltaY > 0) {
			// console.log("first");
			window.removeEventListener("wheel", this.scrollOnceEvent);
			this.secondIntro();
		}
	}

	async playIntro() {
		//wait for the first animation to play first
		await this.firstIntro();
		this.scrollOnceEvent = this.onScroll.bind(this);
		window.addEventListener("wheel", this.scrollOnceEvent);
	}
}
