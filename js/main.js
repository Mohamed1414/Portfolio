
/*
---------------------------------tabs of about section
*/

(() => {
	const aboutSection = document.querySelector(".about-section");
	const tabsContainer = document.querySelector(".about-tabs");

	tabsContainer.addEventListener("click", (event) => {
		// si lo que clicas contiene la clase "tab-item" y no contiene la clase "active" 
		if (event.target.classList.contains("tab-item") &&
			!event.target.classList.contains("active")) {
				const target = event.target.getAttribute("data-target");
				// desactivar el item activo
				tabsContainer.querySelector(".active").classList.remove("outer-shadow", "active");
				//activar la clase "active" en el elemento clicado
				event.target.classList.add("active", "outer-shadow");
				//desactivar el contenido del tab existente
				aboutSection.querySelector(".tab-content.active").classList.remove("active");
				//activar el contenido del elemento que se clica
				aboutSection.querySelector(target).classList.add("active");
			}
	})
})();