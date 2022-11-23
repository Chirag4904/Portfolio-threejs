import Experience from "../Experience";

import Room from "./Room";
import Environment from "./Environment";
export default class World {
	constructor() {
		this.experience = new Experience();
		this.scene = this.experience.scene;
		this.resources = this.experience.resources;

		this.resources.on("loaded", () => {
			this.environment = new Environment();
			this.room = new Room();
		});
	}
}
