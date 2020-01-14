// const electron = require("electron");
const inquirer = require("inquirer");
const axios = require("axios");
const fs = require("fs");
    // convertFactory = require("electron-html-to");

inquirer.prompt([
    {
        type: "input",
        message: "GitHub profile: ",
        name: "username"
    },
    {
        type: "input",
        message: "Favorite color: ",
        name: "favColor"
    }
]).then(answers =>{
    let favColor = answers.favColor;

    axios.get(`https://api.github.com/users/${answers.username}`).then(function(res){
        console.log(res);
        let avatar = res.data.avatar_url;
        let username = res.data.login;
        let name = res.data.name;
        let location = res.data.location;
        let email = res.data.email;
        let bio = res.data.bio;
        let publicRepos = res.data.public_repos; 
        let followers = res.data.followers; 
        let following = res.data.following;
        let url = res.data.url;

        const htmlPage = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <script src="https://kit.fontawesome.com/80eed1293f.js" crossorigin="anonymous"></script>
            <link rel="stylesheet" href="./css/reset.css">
            <link rel="stylesheet" href="./css/bootstrap.css">
            <!-- <link rel="stylesheet" href="./css/style.css"> -->
            <title>Profile Generator</title>
            <style>
                body {
                    background: #f6f6f6;
                }
        
                #pfp {
                    height: 200px;
                    border-radius: 50%;
                    border: 2px solid powderblue;
                }
        
                #att-container{
                    width: 40%;
                }
        
                #color-container{
                    width: 90%;
                    margin: auto;
                    background: ${favColor};
                    border-radius: 10px;
                    color: #f6f6f6;
                }
        
                .col-4 {
                    background: ${favColor};
                    color: #f6f6f6;
                    border-radius: 10px;
                }
        
                a{
                    color: #f6f6f6;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="row">
                    <div class="col mx-auto">
                        <div class="card" id="color-container">
                                <div class="card-body text-center">
                                    <img id="pfp" class="img-fluid" src="${avatar}" alt="profile-photo">
                                    <h2>${name}</h2>
                                    <h5>${bio}</h5>
                                    <div id="att-container" class="d-flex justify-content-between mx-auto">
                                        <p class="lead"><i class="fas fa-location-arrow"></i> ${location}</p>
                                        <a href="${url}" class="lead"><i class="fab fa-github"></i> GitHub</a>
                                        
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
                <h1 class="text-center mt-3">Other Thing</h1>
                <div class="text-center my-5">
                    <div class="row d-flex justify-content-around">
                        <div class="col-4 p-4">
                            Repositories <br>
                            ${publicRepos}
                        </div>
                        <div class="col-4 p-4">
                            Followers <br>
                            ${followers}
                        </div>
                    </div>
                </div>
                <div class="text-center">
                    <div class="row d-flex justify-content-around">
                        <div class="col-4 p-4">
                            Stars
                        </div>
                        <div class="col-4 p-4">
                            Following <br>
                            ${following}
                        </div>
                    </div>
                </div>
            </div>
        </body>
        </html>`;

        fs.writeFile("test.html", htmlPage, (err) =>{
            if (err) throw err;
            console.log("File saved");
        });
    });
});