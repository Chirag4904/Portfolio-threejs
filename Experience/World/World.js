import Experience from "../Experience";

import Room from "./Room";
export default class World {
	constructor() {
		this.experience = new Experience();
		this.scene = this.experience.scene;
		this.resources = this.experience.resources;

		this.resources.on("loaded", () => {
			this.room = new Room();
		});
	}
}
