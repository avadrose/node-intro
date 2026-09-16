const fs = require("fs");
const axios = require("axios");

function writeToFile(filename, data) {
  fs.writeFile(filename, data, "utf8", err => {
    if (err) {
      console.error(`Couldn't write ${filename}:`);
      console.error(err);
      process.exit(1);
    }
  });
}

function cat(path, outputFile) {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      console.error(`Error reading ${path}:`);
      console.error(err);
      process.exit(1);
    }

    if (outputFile) {
      writeToFile(outputFile, data);
    } else {
      console.log(data);
    }
  });
}

async function webCat(url, outputFile) {
  try {
    const response = await axios.get(url);

    if (outputFile) {
      writeToFile(outputFile, response.data);
    } else {
      console.log(response.data);
    }
  } catch (err) {
    console.error(`Error fetching ${url}:`);
    console.error(err.message);
    process.exit(1);
  }
}

let outputFile;
let input;

if (process.argv[2] === "--out") {
  outputFile = process.argv[3];
  input = process.argv[4];
} else {
  input = process.argv[2];
}

if (input.startsWith("http://") || input.startsWith("https://")) {
  webCat(input, outputFile);
} else {
  cat(input, outputFile);
}