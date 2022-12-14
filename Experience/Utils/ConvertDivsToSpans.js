export default function (element) {
	element.style.overflow = "hidden";

	element.innerHTML = element.innerText
		.split("")
		.map((char) => {
			if (char === " ") {
				return `<span>&nbsp;</span>`;
			}
			return `<span class="animateText">${char}</span>`;
		})
		.join("");
	return element;
}
