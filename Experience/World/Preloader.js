import Experience from "../Experience";
import { EventEmitter } from "events";

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
				})
				.to(this.roomChildren.cube.scale, {
					x: 0,
					y: 0,
					z: 0,
					duration: 1,
				})
				.to(
					this.roomChildren.aquarium.scale,
					{
						x: 1,
						y: 1,
						z: 1,
						ease: "back.out(2.2)",
						duration: 0.5,
					},
					">-0.5"
				)
				.to(
					this.roomChildren.rectLight.scale,
					{
						x: 1,
						y: 1,
						z: 1,
						ease: "back.out(2.2)",
						duration: 1.5,
					},
					">-0.2"
				)
				.to(
					this.roomChildren.clock.scale,
					{
						x: 1,
						y: 1,
						z: 1,
						ease: "back.out(2.2)",
						duration: 0.5,
					},
					">-0.4"
				)
				.to(
					this.roomChildren.shelves.scale,
					{
						x: 1,
						y: 1,
						z: 1,
						ease: "back.out(2.2)",
						duration: 0.5,
					},
					">-0.3"
				)
				.to(
					this.roomChildren.lampLight,
					{
						intensity: 1.4,
						ease: "back.out(2.2)",
						duration: 0.5,
					},
					">-0.3"
				)
				.to(
					this.roomChildren.floor_items.scale,
					{
						x: 1,
						y: 1,
						z: 1,
						ease: "back.out(2.2)",
						duration: 0.5,
					},
					">-0.2"
				)

				.to(
					this.roomChildren.desks.scale,
					{
						x: 1,
						y: 1,
						z: 1,
						ease: "back.out(2.2)",
						duration: 0.5,
					},
					">-0.1"
				)
				.to(
					this.roomChildren.table_stuff.scale,
					{
						x: 1,
						y: 1,
						z: 1,
						ease: "back.out(2.2)",
						duration: 0.5,
					},
					">-0.1"
				)
				.to(this.roomChildren.computer.scale, {
					x: 1,
					y: 1,
					z: 1,
					ease: "back.out(2.2)",
					duration: 0.5,
				})
				.set(this.roomChildren.mini_floor.scale, {
					x: 1,
					y: 1,
					z: 1,
				})
				.to(this.roomChildren.chair.scale, {
					x: 1,
					y: 1,
					z: 1,
					ease: "back.out(2.2)",
					duration: 0.5,
				})
				.to(
					this.roomChildren.fish.scale,
					{
						x: 1,
						y: 1,
						z: 1,
						ease: "back.out(2.2)",
						duration: 0.5,
					},
					"<"
				)
				.to(
					this.roomChildren.mailbox.scale,
					{
						x: 1,
						y: 1,
						z: 1,
						ease: "back.out(2.2)",
						duration: 0.5,
					},
					">-0.2"
				)
				.to(
					this.roomChildren.flower1.scale,
					{
						x: 1,
						y: 1,
						z: 1,
						ease: "back.out(2.2)",
						duration: 0.5,
					},
					">-0.2"
				)
				.to(
					this.roomChildren.flower2.scale,
					{
						x: 1,
						y: 1,
						z: 1,
						ease: "back.out(2.2)",
						duration: 0.5,
					},
					">-0.2"
				)
				.to(
					this.roomChildren.floorfirst.scale,
					{
						x: 1,
						y: 1,
						z: 1,
						ease: "back.out(2.2)",
						duration: 0.5,
					},
					">-0.2"
				)
				.to(
					this.roomChildren.floorsecond.scale,
					{
						x: 1,
						y: 1,
						z: 1,
						ease: "back.out(2.2)",
						duration: 0.5,
					},
					">-0.2"
				)
				.to(
					this.roomChildren.floorthird.scale,
					{
						x: 1,
						y: 1,
						z: 1,
						ease: "back.out(2.2)",
						duration: 0.5,
					},
					">-0.2"
				)
				.to(
					this.roomChildren.lamp.scale,
					{
						x: 1,
						y: 1,
						z: 1,
						ease: "back.out(2.2)",
						duration: 0.5,
					},
					">-0.2"
				)
				.to(
					this.roomChildren.chair.rotation,
					{
						y: 4 * Math.PI + Math.PI / 4,
						ease: "power2.out",

						onComplete: resolve,
						duration: 1,
					},
					"<"
				);
		});
	}

	removeEventListeners() {
		window.removeEventListener("wheel", this.scrollOnceEvent);
		window.removeEventListener("touchstart", this.touchStart);
		window.removeEventListener("touchmove", this.touchMove);
	}

	onScroll(e) {
		if (e.deltaY > 0) {
			// console.log("first");
			this.removeEventListeners();
			this.playSecondIntro();
		}
	}

	onTouch(e) {
		this.initalY = e.touches[0].clientY;
	}

	onTouchMove(e) {
		let currentY = e.touches[0].clientY;
		let difference = this.initalY - currentY;
		if (difference > 0) {
			console.log("swipped up");
			this.removeEventListeners();
			this.playSecondIntro();
		}
		this.intialY = null;
	}

	async playIntro() {
		//wait for the first animation to play first

		await this.firstIntro();
		this.moveFlag = true;
		this.scrollOnceEvent = this.onScroll.bind(this);

		this.touchStart = this.onTouch.bind(this);
		this.touchMove = this.onTouchMove.bind(this);
		window.addEventListener("wheel", this.scrollOnceEvent);
		window.addEventListener("touchstart", this.touchStart);
		window.addEventListener("touchmove", this.touchMove);
	}

	async playSecondIntro() {
		this.moveFlag = false;
		this.scaleFlag = true;
		await this.secondIntro();
		this.scaleFlag = false;
		console.log(this.roomChildren.lampLight);
		this.emit("enableControls");
	}

	move() {
		if (this.device === "desktop") {
			this.room.position.set(-1, 0, 0);
		} else {
			this.room.position.set(0, 0, -1);
		}
	}

	scale() {
		if (this.device === "desktop") {
			this.room.scale.set(0.11, 0.11, 0.11);
		} else {
			this.room.scale.set(0.07, 0.07, 0.07);
		}
	}

	update() {
		if (this.moveFlag) {
			this.move();
		}

		if (this.scaleFlag) {
			this.scale();
		}
	}
}
