const fs = require("fs");
const inquirer = require("inquirer");
const axios = require("axios");

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
    console.log(answers.username);
    console.log(answers.favColor);

    axios.get(`https://api.github.com/users/${answers.username}`).then(function(res){
        console.log(res);
        let avatar = res.data.avatar_url;
        let username = res.data.login;
        let name = res.data.name;
        let location = res.data.location;
        let email = res.data.email;
        let bio = res.data.bio;
        let publicRepos = res.data.publicRepos; 
        let followers = res.data.followers; 
        let following = res.data.following;
        let url = res.data.url;
    });
});