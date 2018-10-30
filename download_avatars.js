var args = process.argv.slice(2);
var owner = args[0].toString();
var repo = args[1].toString();

var request = require('request');
var token = require('./secrets');
var fs = require('fs');


function downloadImageByURL(url, filePath) {

  request.get(url)
         .on('error', function (err) {
           throw err;
         })
         .on('response', function (response) {
           console.log('Response: ', response.statusCode,);
         })
         .pipe(fs.createWriteStream(filePath));
}

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${token.GITHUB_TOKEN}`
    }
  };
  request(options, function(err, res, body) {
    cb(err, body);
  });
}

getRepoContributors(owner, repo, function(err, result) {
  console.log("Errors:", err);
  var listOfObejects = JSON.parse(result);
  for (var i = 0; i < listOfObejects.length; i++) {
    downloadImageByURL(listOfObejects[i]["avatar_url"],`avatars/${listOfObejects[i]["login"]}.jpg`)
  }
});



