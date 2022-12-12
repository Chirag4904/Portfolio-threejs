import Experience from "../Experience";
import { EventEmitter } from "events";

import Room from "./Room";
import Environment from "./Environment";
import Controls from "./Controls";
import Floor from "./Floor";
export default class World extends EventEmitter {
	constructor() {
		super();
		this.experience = new Experience();
		this.scene = this.experience.scene;
		this.resources = this.experience.resources;
		this.theme = this.experience.theme;
		this.resources.on("loaded", () => {
			this.environment = new Environment();
			this.room = new Room();
			this.floor = new Floor();
			// this.controls = new Controls();
			this.emit("worldReady");
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

		// if (this.controls) {
		// 	this.controls.update();
		// }
	}
}
