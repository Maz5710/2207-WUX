/*jshint esversion: 6 */

$(document).ready(function () {

    let url;

    // Get config.json and variable from it
    $.ajax({
        url: "config.json",
        type: "GET",
        dataType: "json",

        success: function (configData) {
            console.log(configData.SERVER_URL, configData.SERVER_PORT);
            url = `${configData.SERVER_URL}:${configData.SERVER_PORT}`;
            console.log(url);
        },
        error: function (error) {
            console.log(error);
        }
    });


    // Off Canvas Button
    const offCanvasOpen = document.querySelector(".off-canvas-open");
    const sidebar = document.querySelector(".sidebar");
    const offCanvasClose = document.querySelector(".off-canvas-close");

    offCanvasOpen.addEventListener("click", function () {
        sidebar.classList.toggle("is-hidden");
    });
    console.log(offCanvasOpen);

    offCanvasClose.addEventListener("click", function () {
        sidebar.classList.toggle("is-hidden");
    });
    console.log(offCanvasClose);


    // Accordion
    const items = document.querySelectorAll(".accordion #accordionButton");
    const editItemAccordion = document.querySelectorAll(".edit-accordion #editAccordionButton");
    const deleteItemAccordion = document.querySelectorAll(".delete-accordion #deleteAccordionButton");

    function toggleAccordion() {
        const itemToggle = this.getAttribute('aria-expanded');

        for (i = 0; i < items.length; i++) {
            items[i].setAttribute('aria-expanded', 'false');
        }

        if (itemToggle == 'false') {
            this.setAttribute('aria-expanded', 'true');
        }
    }

    items.forEach(item => item.addEventListener('click', toggleAccordion));

    
    function toggleEditAccordion() {
        const editToggle = this.getAttribute("aria-expanded");

        for (i = 0; i < editItemAccordion.length; i++) {
            editItemAccordion[i].setAttribute("aria-expanded", "false");
        }

        if (editToggle == "false") {
            this.setAttribute("aria-expanded", "true");
        }
    }

    editItemAccordion.forEach(item => item.addEventListener("click", toggleEditAccordion));


    function toggleDeleteAccordion() {
        const deleteToggle = this.getAttribute("aria-expanded");

        for (i = 0; i < deleteItemAccordion.length; i++) {
            deleteItemAccordion[i].setAttribute("aria-expanded", "false");
        }

        if (deleteToggle == "false") {
            this.setAttribute("aria-expanded", "true");
        }
    }

    deleteItemAccordion.forEach(item => item.addEventListener("click", toggleDeleteAccordion));


});