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
            getAllProducts();
        },
        error: function (error) {
            console.log(error);
        }
    });

})