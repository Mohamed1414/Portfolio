
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

function bodyScrollingToggle (){
	document.body.classList.toggle("stop-scrolling");
}
/*
------------------------------portfolio filter and popup
*/
(() => {
	const filterContainer = document.querySelector(".portfolio-filter");
	const portfolioItemsContainer = document.querySelector(".portfolio-items");
	const portfolioItems = document.querySelectorAll(".portfolio-item");
	const popup = document.querySelector(".portfolio-popup");
	const prevBtn = popup.querySelector(".pp-prev");
	const nextBtn = popup.querySelector(".pp-next");
	const closeBtn = popup.querySelector(".pp-close");
	const projectDetailsContainer = popup.querySelector(".pp-details");
	const projectDetailsBtn = popup.querySelector(".pp-project-details-btn");
	let itemIdex;
	let slideIndex;
	let screenshots;

	/*
	----------------filter portfolio items
	*/
	filterContainer.addEventListener("click", (event) => {
		if (event.target.classList.contains("filter-item") &&
		!event.target.classList.contains("active")) {
		// deactivate active class in filter-item
			filterContainer.querySelector(".active").classList.remove("outer-shadow", "active");
			//activate new filter-item
			event.target.classList.add("active", "outer-shadow");
			const target = event.target.getAttribute("data-target");
			portfolioItems.forEach((item) => {
				if (target === item.getAttribute("data-category") || target === 'todos'){
					item.classList.remove("hide");
					item.classList.add("show");
				}
				else {
					item.classList.remove("show");
					item.classList.add("hide");
				}
			})
		}
	})
	portfolioItemsContainer.addEventListener("click", (event) => {
		if (event.target.closest(".portfolio-item-inner")){
			const portfolioItem = event.target.closest(".portfolio-item-inner").parentElement;
			//get the portfolioItem index
			itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(portfolioItem);
			screenshots = portfolioItems[itemIndex].querySelector(".portfolio-item-img img").getAttribute("data-screenshots");
			//convert screenshots into array
			screenshots = screenshots.split(",");
			if (screenshots.length === 1){
				prevBtn.style.display = "none";
				nextBtn.style.display = "none";
			}
			else {
				prevBtn.style.display = "block";
				nextBtn.style.display = "block";
			}
			slideIndex = 0;
			popupToggle();
			popupSlideShow();
			popupDetails();
		}
	})

	closeBtn.addEventListener("click", () => {
		popupToggle();
	})

	function popupToggle () {
		popup.classList.toggle("open");
		bodyScrollingToggle();
	}
	function popupSlideShow() {
		const imgSrc = screenshots[slideIndex];
		const popupImg = popup.querySelector(".pp-img");
		// activate loader until the popup
		popup.querySelector(".pp-loader").classList.add("active");
		popupImg.src = imgSrc;
		popupImg.onload = () => {
			//deactivate loader after the popupImg loaded
			popup.querySelector(".pp-loader").classList.remove("active");
		}
		popup.querySelector(".pp-counter").innerHTML = (slideIndex + 1) + "of" + screenshots.length;
	}
	// next slide
	nextBtn.addEventListener("click", () => {
		if (slideIndex === screenshots.length - 1){
			slideIndex = 0;
		}
		else {
			slideIndex++;
		}
		popupSlideShow();
	})
	//prev slide
	prevBtn.addEventListener("click", () => {
		if (slideIndex === 0) {
			slideIndex = screenshots.length - 1;
		}
		else {
			slideIndex--;
		}
		popupSlideShow();

	})

	projectDetailsBtn.addEventListener("click", () => {
		popupDetailsToggle();
	})
	function popupDetailsToggle () {
		if (projectDetailsBtn.classList.contains("active")) {
			projectDetailsContainer.classList.remove("active");
			projectDetailsContainer.style.maxHeight = 0 + "px";
		}
		else {
			projectDetailsContainer.classList.add("active");
			projectDetailsContainer.style.maxHeight = projectDetailsContainer.scrollHeight + "px";
		}
	}
	//arreglar el boton de project details: no ejecuta bien la transicion al clickar
}) ();