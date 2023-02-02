const fs = require('fs');
const Ethers = require('ethers');
const next = require('next');

const masterJSON = require('./master.json');
const inputJSON = require('./input.json');

const app = next({ dev: true });

const outputJSON = { ...masterJSON };

inputJSON.forEach((address) => {
  try {
    const formattedAddress = Ethers.utils.getAddress(address);
  
    if (masterJSON.hasOwnProperty(formattedAddress)) {
      console.log("Address already exists!", formattedAddress)
    } else {
      outputJSON[formattedAddress] = 1;
    }
  } catch (err) {
    console.log('Removed Invalid!', address);
  }
});

fs.writeFile('./output.json', JSON.stringify(outputJSON), (err) => {
  if (err) {
    console.log(err);
  }
});

app.prepare().then(() => {
  console.log('Successfully wrote output.json');
});