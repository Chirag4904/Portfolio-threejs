import Experience from "../Experience";

import Room from "./Room";
export default class World {
	constructor() {
		this.experience = new Experience();
		this.scene = this.experience.scene;

		this.room = new Room();
	}
}
