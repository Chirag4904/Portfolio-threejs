import * as THREE from "three";
//utils
import Sizes from "./Utils/Sizes";
import Time from "./Utils/Time";
import Resources from "./Utils/Resources";
import assets from "./Utils/assets";

import Camera from "./Camera";
import Renderer from "./Renderer";

import World from "./World/World";

export default class Experience {
	static instance;
	constructor(canvas) {
		//creating a singleton as Experience
		//if instance of Experience already exists then return that only else create a new one with the below properties
		if (Experience.instance) {
			return Experience.instance;
		}
		Experience.instance = this;
		this.canvas = canvas;
		this.scene = new THREE.Scene();
		this.time = new Time();
		this.sizes = new Sizes();
		this.camera = new Camera();
		this.renderer = new Renderer();
		this.resources = new Resources(assets);
		this.world = new World();

		this.resources.on("loaded", () => {
			console.log("hello");
		});

		//captures event tick dispatched by time
		this.time.on("tick", () => {
			//update all other classes
			this.update();
		});

		//captures event resize dispatched by Sizes
		this.sizes.on("resize", () => {
			this.resize();
		});
	}

	update() {
		this.camera.update();
		this.renderer.update();
	}

	resize() {
		this.camera.resize();
		this.renderer.resize();
	}
}
