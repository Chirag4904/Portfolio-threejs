import * as THREE from "three";
import Sizes from "./Utils/Sizes";

import Camera from "./Camera";
import Renderer from "./Renderer";
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
		this.sizes = new Sizes();
		this.camera = new Camera();
		this.renderer = new Renderer();
	}
}
