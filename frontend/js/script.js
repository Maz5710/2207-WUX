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
        let username = sessionStorage.getItem('username');
        //     if (!username) {
        //         alert ('Please log in');
        //    } else {
        $.ajax({
            url: `http://${url}/allProjectsFromDB`,
            type: `GET`,
            dataType: `json`,
            success: function (projectsFromMongo) {
                let results = document.getElementById('result');
                results.innerHTML = '';
                for (let i = 0; i < projectsFromMongo.length; i++) {
                    let project = projectsFromMongo[i];
                    let createdBy = projectsFromMongo[i].username;
                    console.log(projectsFromMongo[i]);
                    results.innerHTML += `
                        ${project.project_name}
                        ${project.project_img}
                        ${project.project_description}
                        `;
                    // editProducts();
                    // deleteButtons();
                    // readmore();
                }
            },
            error: function () {
                alert('Unable to get projects');
            }
        });
        // }
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
        // prevents reloading on submit        
        event.preventDefault();
        let username = $('#username').val();
        let password = $('#password').val();
        // remove logs!!!!        
        console.log(username, password);
        // if statement for username & password values        
        if (username == '' || password == '') {
            // remove alerts!!!!!            
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
                    // error msg for backend                    
                    if (user == 'User not found. Please try again') {
                        alert('User not found. Please try again');
                    } else if (user == 'not authorized') {
                        // remove alerts!!!!                        
                        alert('Please try with correct details');
                        // reset & clear input values                        
                        $('#login-username').val('');
                        $('#password').val('');
                    } else {
                        //else statement if login is successful                         
                        // function to populate welcome msg in inner html                         
                        let welcomeCont = document.getElementById('loggedIn');
                        let loggedInUser = username.toUpperCase();
                        welcomeCont.innerHTML = `<h2>Welcome, ${loggedInUser}</h2>`
                        // hide login form                        
                        $('#loginForm').hide();
                        // hide login btn                         
                        $('#loginBtn').hide();
                        // show logout btn                        
                        $('#logoutBtn').show();
                    } // end of ifs                
                }, //success                
                error: function () {
                    // REMOVE LOGS!!!                    
                    console.log('error: cannot call api');
                    alert('Unable to login - unable to call api');
                } //error            
            }); //end of ajax        
        } //end of else    
    }); //end of login click function    

    // Logout    
    $('#logoutBtn').click(function () {
        sessionStorage.clear();
        // . in ./ represents root folder, redirects to new page        
        window.location.href = './index.html';
    });
    // End of log out

});