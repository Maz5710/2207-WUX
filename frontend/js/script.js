/*jshint esversion: 6 */

console.log('frontend script is working 2207-wux');

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
        let username = sessionStorage.getItem ('username');
        if (!username) {
            alert ('Please log in');
       } else {
        $.ajax({
            url: `http://${url}/allProjectsFromDB`,
            type: `GET`,
            dataType: `json`,
            success: function (projectsFromMongo) {
                let results = document.getElementById('result');
                results.innerHTML = '';
                for (let i = 0; i < projectsFromMongo.length; i++) {
                    let createdBy = projectsFromMongo[i].username;
                    console.log(projectsFromMongo[i]);
                    if (createdBy === username) {
                        results.innerHTML += `
                        <div class="col-4 mt-3 mb-3">
                            <div class="card">
                            <img class="card-img-top" src="${projectsFromMongo[i].project_img}" alt="${projectsFromMongo[i].project_name} image">
                                <div class="card-body">
                                    <h5 class="card-title">${projectsFromMongo[i].project_name}</h5>
                                     <button value="${projectsFromMongo[i]._id}" class="btn delete btn-primary" type="button" name="button">Delete</button>
                                     <button value="${projectsFromMongo[i]._id}" data-bs-toggle="modal" data-bs-target="#editModal" class="btn edit btn-primary" type="button" name="button">Edit</button>
                                     <button value="${projectsFromMongo[i]._id}" data-bs-toggle="modal" data-bs-target="#readmoreModal" class="btn readmore btn-primary" type="button" name="button">Read More</button>
                                </div>
                            </div>
                        </div>
                        `;
                    } else {
                        results.innerHTML += `
                        <div class="col-4 mt-3 mb-3">
                            <div class="card">
                            <img class="card-img-top" src="${projectsFromMongo[i].image_url}" alt="${prjoectsFromMongo[i].name} image">
                                <div class="card-body">
                                    <h5 class="card-title">${projectsFromMongo[i].project_name}</h5>
                                     <button value="${projectsFromMongo[i]._id}" data-bs-toggle="modal" data-bs-target="#readmoreModal" class="btn readmore btn-primary" type="button" name="button">Read More</button>
                                </div>
                            </div>
                        </div>
                        `;
                    }

                    editProducts();
                    deleteButtons();
                    readmore();
                }
            },
            error: function () {
                alert('Unable to get projects');
            }
        });
    }
}

    //View Projects onclick of View Projects Button
    $('#viewProjects').click(function () {
        getAllProjects();
    }); // End of View Projects



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


    // Log in User
    $('#loginBtn').click(function (event) {
        event.preventDefault();
        let username = $('#username').val();
        let password = $('#password').val();

        console.log(username, password);

        if (username == '' || password == '') {
            alert('Please enter all details');
        } else {
            $.ajax({
                url: `http://${url}/loginUser`,
                type: 'POST',
                data: {
                    username: username,
                    password: password
                },
                success: function (user) {
                    //console.log(user);

                    console.log("ajax working");

                    if (user == 'User not found. Please try again') {
                        alert('User not found. Please try again');
                    } else if (user == 'not authorized') {
                        alert('Please try with correct details');
                        $('#login-username').val('');
                        $('#password').val('');
                    } else {
                        sessionStorage.setItem('userID', user['_id']);
                        sessionStorage.setItem('userName', user['username']);
                        sessionStorage.setItem('userEmail', user['email']);

                        console.log(sessionStorage);

                        // let loggedIn = document.querySelector('.logged-in');
                        // loggedIn.innerHTML = `<p>Logged in as <span class="text-danger">${username.toUpperCase()}</span></p>`;
                        // alert(`Welcome back ${username.toUpperCase()}!`);
                    } // end of ifs
                }, //success
                error: function () {
                    console.log('error: cannot call api');
                    alert('Unable to login - unable to call api');
                } //error
            }); //end of ajax
        } //end of else
    }); //end of login click function

    // Logout
    $('#logout').click(function () {
        sessionStorage.clear();
        alert('You are now logged out');
        console.log(sessionStorage);
        window.location.href = '/index.html';
    });
    // End of log out

});