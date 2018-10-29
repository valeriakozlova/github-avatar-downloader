var request = require('request');
var token = require('./secrets');
var fs = require('fs');

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

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  var listOfObejects = JSON.parse(result);
  var listOfAvatars = [];
  for (var i = 0; i < listOfObejects.length; i++) {
    listOfAvatars.push(listOfObejects[i]["avatar_url"])
  }
  console.log(listOfAvatars);
});


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

downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg")