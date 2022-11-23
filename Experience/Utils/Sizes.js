export default class Sizes {
	constructor() {
		this.width = window.innerWidth;
		this.height = window.innerHeight;
		this.aspect = this.width / this.height;
		this.pixelRatio = Math.min(window.devicePixelRatio, 2);
		this.frustrum = 5;

		window.addEventListener("resize", () => {
			this.width = window.innerWidth;
			this.height = window.innerHeight;
			// console.log(this.width, this.height);
			this.aspect = this.width / this.height;
			this.pixelRatio = Math.min(window.devicePixelRatio, 2);
		});
	}
}
