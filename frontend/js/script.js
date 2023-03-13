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
            getAllProjects();
        },
        error: function (error) {
            console.log(error);
        }
    });

    function getAllProjects() {
        let username = sessionStorage.getItem('username');
        if (!username) {
            alert('Please log in.');
        } else {
            $.ajax({
                url: `http://${url}/allProjectsFromDB`,
                type: 'GET',
                dataType: 'json',
                success: function (allProjectsFromDB) {
                    let results = document.getElementById('result');
                    results.innerHTML = '';
                    for (let i = 0; i < allProjectsFromDB.length; i++) {
                        let createdBy = allProjectsFromDB[i].username;
                        console.log(allProjectsFromDB[i]);
                        if (createdBy === username) {
                            results.innerHTML += `
                            <div class="col-4 mt-3 mb-3>
                                <div class="card">
                                    <img class="card-img-top" src="${allProjectsFromDB[i].project_img}" alt="${allProjectsFromDB[i].project_name} image">
                                    <div class="card-body">
                                        <h5 class="card-title">${projectsFromMongo[i].project_name}</h5>
                                        <button value="${projectsFromMongo[i]._id}" data-bs-toggle="modal" data-bs-target="#editModal" class="btn edit btn-primary" type="button" name="button">Edit</button>
                                        <button value="${projectsFromMongo[i]._id}" class="btn delete btn-primary" type="button" name="button">Delete</button>
                                    </div>
                                </div>
                            </div>
                            `;
                        }

                        editProducts();
                        deleteButtons();
                    }
                },
                error: function () {
                    alert('Unable to get projects');
                }
            });
        }
    }

    //View Products onclick of View Projects Button
    $('#viewProjects').click(function () {
        getAllProjects();
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