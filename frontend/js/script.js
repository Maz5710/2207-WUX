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


    // // Accordion
    // const acc = document.getElementsByClassName("accordion");
    // let i;

    // for (i = 0; i < acc.length; i++) {
    //     acc[i].addEventListener("click", function () {
    //         /* Toggle between adding and removing the "active" class,
    //         to highlight the button that controls the panel */
    //         this.classList.toggle("active");

    //         /* Toggle between hiding and showing the active panel */
    //         const panel = this.nextElementSibling;
    //         if (panel.style.display === "block") {
    //             panel.style.display = "none";
    //         } else {
    //             panel.style.display = "block";
    //         }
    //     });
    // }

});