const fs = require("fs");
const axios = require("axios");

function cat(path) {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      console.error(`Error reading ${path}:`);
      console.error(err);
      process.exit(1);
    }

    console.log(data);
  });
}

async function webCat(url) {
  try {
    const response = await axios.get(url);
    console.log(response.data);
  } catch (err) {
    console.error(`Error fetching ${url}:`);
    console.error(err.message);
    process.exit(1);
  }
}

const input = process.argv[2];

if (input.startsWith("http://") || input.startsWith("https://")) {
  webCat(input);
} else {
  cat(input);
}