// Node and Ethers Script
const ethers = require('ethers');
const fs = require('fs');

const input = require('./input.json');

const output = {};

let tally = 0;

Object.keys(input).forEach(key => {
  try {
    const isValid = ethers.utils.isAddress(key);
    const isChecksummed = ethers.utils.getAddress(key) === key;
    tally += input[key];
    if (isValid && !isChecksummed) {
      const newKey = ethers.utils.getAddress(key);
      console.log(`Replacing with new: [${key}, ${input[key]}]`);
      output[newKey] = input[key];
    } else if (isValid && isChecksummed) {
      output[key] = input[key];
    } else {
      console.log(`Removed Invalid: [${key}, ${input[key]}]`);
    }
  } catch (err) {
    console.log(`Removed Invalid: [${key}, ${input[key]}]`);
  }
});

console.log("Total:", tally)

fs.writeFileSync('./output.json', JSON.stringify(output));