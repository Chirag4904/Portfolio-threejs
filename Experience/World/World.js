import Experience from "../Experience";

import Room from "./Room";
import Environment from "./Environment";
import Controls from "./Controls";
export default class World {
	constructor() {
		this.experience = new Experience();
		this.scene = this.experience.scene;
		this.resources = this.experience.resources;

		this.resources.on("loaded", () => {
			this.environment = new Environment();
			this.room = new Room();
			this.controls = new Controls();
		});
	}

	update() {
		if (this.room) {
			this.room.update();
		}

		if (this.controls) {
			this.controls.update();
		}
	}
}
