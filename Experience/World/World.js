import Experience from "../Experience";

import Room from "./Room";
import Environment from "./Environment";
import Controls from "./Controls";
import Floor from "./Floor";
export default class World {
	constructor() {
		this.experience = new Experience();
		this.scene = this.experience.scene;
		this.resources = this.experience.resources;
		this.theme = this.experience.theme;
		this.resources.on("loaded", () => {
			this.environment = new Environment();
			this.room = new Room();
			this.controls = new Controls();
			this.floor = new Floor();
		});

		this.theme.on("switch", (theme) => {
			this.switchTheme(theme);
		});
	}

	switchTheme(theme) {
		if (this.environment) {
			this.environment.switchTheme(theme);
		}
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
