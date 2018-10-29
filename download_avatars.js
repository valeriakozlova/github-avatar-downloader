var request = require('request');
var token = require('./secrets');

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