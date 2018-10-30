var request = require('request');
var token = require('./secrets');
var fs = require('fs');
var dir = "./avatars";

var args = process.argv.slice(2);

if (args.length < 2) {
  console.log("Error, please include owner name and repo name");
} else {

var owner = args[0].toString();
var repo = args[1].toString();

function downloadImageByURL(url, filePath) {

  request.get(url)
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
  if (err) {
    console.log("Error:", err);
  }
  var listOfObejects = JSON.parse(result);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  for (var i = 0; i < listOfObejects.length; i++) {

    downloadImageByURL(listOfObejects[i]["avatar_url"],`${dir}/${listOfObejects[i]["login"]}.jpg`)
  }
});

}


