// Node and Ethers Script
const ethers = require('ethers');
const fs = require('fs');

const input = require('./input.json');

const output = [];

let tally = 0;

input.forEach(addr => {
  try {
    const isValid = ethers.utils.isAddress(addr);
    const isChecksummed = ethers.utils.getAddress(addr) === addr;
    if (isValid && !isChecksummed) {
      const newaddr = ethers.utils.getAddress(addr);
      console.log(`Replacing With New: [${newaddr}]`);
      tally += 1;
      output.push(newaddr);
    } else if (isValid && isChecksummed) {
      tally += 1;
      output.push(addr);
    } else {
      console.log(`Removed Invalid: [${addr}]`);
    }
  } catch (err) {
    console.log(`Removed Invalid: [${addr}, ${input[addr]}]`);
  }
});

console.log("Total:", tally)

fs.writeFileSync('./output.json', JSON.stringify(output));