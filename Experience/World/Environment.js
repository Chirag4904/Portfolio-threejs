import * as THREE from "three";
import Experience from "../Experience";
import GSAP from "gsap";

import GUI from "lil-gui";
export default class Environment {
	constructor() {
		this.experience = new Experience();
		this.scene = this.experience.scene;

		this.setSunlight();

		this.setAmbientLight();
		// this.setGui();
	}

	setGui() {
		this.gui = new GUI({ container: document.querySelector(".hero-main") });
		this.obj = {
			colorObj: { r: 0, g: 0, b: 0 },
			intensity: 3,
		};
		this.gui.addColor(this.obj, "colorObj").onChange(() => {
			this.sunLight.color.copy(this.obj.colorObj);
			this.ambientLight.color.copy(this.obj.colorObj);
		});

		this.gui.add(this.obj, "intensity", 0, 10).onChange(() => {
			this.sunLight.intensity = this.obj.intensity;
			this.ambientLight.intensity = this.obj.intensity;
		});
	}

	setSunlight() {
		this.sunLight = new THREE.DirectionalLight(0xffffff, 2);
		this.sunLight.position.set(-1.5, 6, 3);
		// const helper = new THREE.DirectionalLightHelper(this.sunLight, 5);
		// this.scene.add(helper);
		this.sunLight.castShadow = true;
		this.sunLight.shadow.camera.far = 20;
		this.sunLight.shadow.mapSize.set(2048, 2048);
		this.sunLight.shadow.normalBias = 0.05;

		this.scene.add(this.sunLight);
	}

	setAmbientLight() {
		this.ambientLight = new THREE.AmbientLight("#fff", 0.9);
		this.scene.add(this.ambientLight);
	}
	switchTheme(theme) {
		if (theme === "dark") {
			GSAP.to(this.sunLight.color, {
				r: 0.17254901960784313,
				g: 0.23137254901960785,
				b: 0.6862745098039216,
			});

			GSAP.to(this.ambientLight.color, {
				r: 0.17254901960784313,
				g: 0.23137254901960785,
				b: 0.6862745098039216,
			});

			GSAP.to(this.sunLight, {
				intensity: 0.78,
			});
			GSAP.to(this.ambientLight, {
				intensity: 0.78,
			});
		} else {
			GSAP.to(this.sunLight.color, {
				r: 255 / 255,
				g: 255 / 255,
				b: 255 / 255,
			});
			GSAP.to(this.ambientLight.color, {
				r: 255 / 255,
				g: 255 / 255,
				b: 255 / 255,
			});

			GSAP.to(this.sunLight, {
				intensity: 1,
			});
			GSAP.to(this.ambientLight, {
				intensity: 1,
			});
		}
	}
}
