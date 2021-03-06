const electronPrebuilt = require("electron-prebuilt");
const inquirer = require("inquirer");
const axios = require("axios");
const fs = require("fs");
const convertFactory = require("electron-html-to");
const conversion = convertFactory({
    converterPath: convertFactory.converters.PDF,
    allowLocalFilesAccess: true
});
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
        let avatar = res.data.avatar_url;
        let username = res.data.login;
        let name = res.data.name;
        let location = res.data.location;
        let bio = res.data.bio;
        let publicRepos = res.data.public_repos; 
        let followers = res.data.followers; 
        let following = res.data.following;
        let url = res.data.url;
        let blog = res.data.blog;

        const colors = {
            green: {
              wrapperBackground: "#E6E1C3",
              headerBackground: "#C1C72C",
              headerColor: "black",
              photoBorderColor: "#black"
            },
            blue: {
              wrapperBackground: "#5F64D3",
              headerBackground: "#26175A",
              headerColor: "white",
              photoBorderColor: "#73448C"
            },
            pink: {
              wrapperBackground: "#879CDF",
              headerBackground: "#FF8374",
              headerColor: "white",
              photoBorderColor: "#FEE24C"
            },
            red: {
              wrapperBackground: "#DE9967",
              headerBackground: "#870603",
              headerColor: "white",
              photoBorderColor: "white"
            }
          };          

        const htmlPage = `<!DOCTYPE html>
        <html lang="en">
           <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <meta http-equiv="X-UA-Compatible" content="ie=edge" />
              <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"/>
              <link href="https://fonts.googleapis.com/css?family=BioRhyme|Cabin&display=swap" rel="stylesheet">
              <title>Document</title>
              <style>
                  @page {
                    margin: 0;
                  }
                 *,
                 *::after,
                 *::before {
                 box-sizing: border-box;
                 }
                 html, body {
                 padding: 0;
                 margin: 0;
                 }
                 html, body, .wrapper {
                 height: 100%;
                 }
                 .wrapper {
                 background-color: ${colors[favColor].wrapperBackground};
                 /* background-color: coral; */
                 padding-top: 100px;
                 }
                 body {
                 background-color: white;
                 -webkit-print-color-adjust: exact !important;
                 font-family: 'Cabin', sans-serif;
                 }
                 main {
                 background-color: #E9EDEE;
                 height: auto;
                 padding-top: 30px;
                 }
                 h1, h2, h3, h4, h5, h6 {
                 font-family: 'BioRhyme', serif;
                 margin: 0;
                 }
                 h1 {
                 font-size: 3em;
                 }
                 h2 {
                 font-size: 2.5em;
                 }
                 h3 {
                 font-size: 2em;
                 }
                 h4 {
                 font-size: 1.5em;
                 }
                 h5 {
                 font-size: 1.3em;
                 }
                 h6 {
                 font-size: 1.2em;
                 }
                 .photo-header {
                 position: relative;
                 margin: 0 auto;
                 margin-bottom: -50px;
                 display: flex;
                 justify-content: center;
                 flex-wrap: wrap;
                 background-color: ${colors[favColor].headerBackground};
                 color: ${colors[favColor].headerColor};
                 padding: 10px;
                 width: 95%;
                 /* background-color: blue; */
                 border-radius: 6px;
                 }
                 .photo-header img {
                 width: 250px;
                 height: 250px;
                 border-radius: 50%;
                 object-fit: cover;
                 margin-top: -75px;
                 border: 6px solid ${colors[favColor].photoBorderColor};
                 box-shadow: rgba(0, 0, 0, 0.3) 4px 1px 20px 4px;
                 }
                 .photo-header h1, .photo-header h2 {
                 width: 100%;
                 text-align: center;
                 }
                 .photo-header h1 {
                 margin-top: 10px;
                 }
                 .links-nav {
                 width: 100%;
                 text-align: center;
                 padding: 20px 0;
                 font-size: 1.1em;
                 }
                 .nav-link {
                 display: inline-block;
                 margin: 5px 10px;
                 }
                 .workExp-date {
                 font-style: italic;
                 font-size: .7em;
                 text-align: right;
                 margin-top: 10px;
                 }
                 .container {
                 padding: 50px;
                 padding-left: 100px;
                 padding-right: 100px;
                 }
        
                 .row {
                   display: flex;
                   flex-wrap: wrap;
                   justify-content: space-between;
                   margin-top: 20px;
                   margin-bottom: 20px;
                 }
        
                 .card {
                   padding: 20px;
                   border-radius: 6px;
                   background-color: ${colors[favColor].headerBackground};
                   color: ${colors[favColor].headerColor};
                   margin: 20px;
                   /* background-color: blue; */
                 }
                 
                 .col {
                 flex: 1;
                 text-align: center;
                 }
      
                 .col-custom {
                 flex: 1;
                 text-align: center;
                 display: flex;
                 justify-content: center;
                 }
        
                 a, a:hover {
                 text-decoration: none;
                 color: inherit;
                 font-weight: bold;
                 }
        
                 @media print { 
                  body { 
                    zoom: .75; 
                  } 
                 }
              </style>
          </head>
          <body>
              <div class="wrapper">
                  <div class="container">
                      <div class="row">
                          <div class="col">
                              <div class="photo-header">
                                  <img src="${avatar}" alt="profile-photo" class="img">
                                  <h1>Hi!</h1>
                                  <h2>My name is ${name}!</h2>
                                  <a href="#" class="nav-link"><i class="fas fa-map-marker-alt"></i> ${location}</a>
                                  <a href="${url}" class="nav-link"><i class="fab fa-github-alt"></i> ${username}</a>
                                  <a href="${blog}" class="nav-link"><i class="fas fa-rss"></i> Blog</a>
                              </div>
                          </div>
                      </div>
                      <div class="main">
                          <div class="container">
                              <div class="row">
                                  <div class="col">
                                      <h3>${bio}</h3>
                                  </div>
                              </div>
                              <div class="row">
                                  <div class="col-custom">
                                      <div class="card" style="width: 80%">Public Repositories <br> ${publicRepos} </div>
                                  </div>
                                  <div class="col-custom">
                                      <div class="card" style="width: 80%">Followers <br> ${followers}</div>
                                  </div>
                              </div>
                              <div class="row">
                                  <div class="col-custom">
                                      <div class="card" style="width: 80%">GitHub Stars <br> Stars</div>
                                  </div>
                                  <div class="col-custom">
                                      <div class="card" style="width: 80%">Following <br> ${following}</div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </body>`;

        const htmlFile = fs.writeFile("profile.html", htmlPage, (err) =>{
            if (err) throw err;
        });

        conversion({ html: htmlPage }, function(err, result) {
            if (err) {
              return console.error(err);
            }
           
            console.log(result.numberOfPages);
            console.log(result.logs);
            result.stream.pipe(fs.createWriteStream('profile.pdf'));
            conversion.kill(); // necessary if you use the electron-server strategy, see bellow for details
          });



        // fs.writeFile("test.html", htmlPage, (err) =>{
        //     if (err) throw err;
        //     console.log("File saved");
        // });
    });
});