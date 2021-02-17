/**
 * Javacript boilerplate
 * for Google Hash Code competition
 *
 * @link https://github.com/makannew/hash-code-javascript
 *
 * @author Makan Edrisi
 *
 * @ since 2021
 *
 */
let fs = require("fs");
let path = require("path");
let inputBuffer = [];
const nullFunc = () => null;
let checkAvailableInput = nullFunc;
const readlineModule = require("readline");
const outputFile = fs.createWriteStream("result", {
  flags: "w",
});

function arrayToFile(data) {
  lineToFile(data.join(" "));
}

function lineToFile(data) {
  outputFile.write(data);
  outputFile.write("\n");
}

function syncWithInput(readlineModule, input) {
  inputBuffer = [];
  const readInputLine = readlineModule.createInterface({
    input,
  });
  readInputLine.on("line", (input) => {
    const lines = input.split("/n");
    lines.forEach((line) => inputBuffer.push(line.trim()));
    checkAvailableInput();
  });
}

async function readLine() {
  return new Promise((resolve, reject) => {
    checkAvailableInput = () => {
      if (inputBuffer.length > 0) {
        checkAvailableInput = nullFunc;
        resolve(inputBuffer.shift());
      }
    };
    checkAvailableInput();
  });
}

async function readArray() {
  const newLine = await readLine();
  const inputArray = newLine.split(" ");
  return inputArray;
}

async function readIntArray() {
  const data = await readArray();
  for (let i in data) {
    data[i] = parseInt(data[i], 10);
  }
  return data;
}
// kick-start-helpers webassembly module
// Automatically generated at Tue Sep 29 2020 15:48:19 GMT+0800 (Australian Western Standard Time)
const wasmString =
  "0,97,115,109,1,0,0,0,1,7,1,96,2,124,124,1,124,3,5,4,0,0,0,0,7,37,4,6,109,117,108,77,111,100,0,0,6,101,120,112,77,111,100,0,1,6,100,105,118,77,111,100,0,2,6,105,110,116,68,105,118,0,3,10,158,1,4,38,0,32,0,176,66,135,148,235,220,3,129,32,1,176,66,135,148,235,220,3,129,126,66,135,148,235,220,3,124,66,135,148,235,220,3,129,185,11,86,2,2,126,1,127,66,1,33,2,32,0,177,66,135,148,235,220,3,130,33,3,32,1,177,66,135,148,235,220,3,130,167,33,4,3,64,32,4,65,1,113,4,64,32,2,32,3,126,66,135,148,235,220,3,130,33,2,11,32,3,32,3,126,66,135,148,235,220,3,130,33,3,32,4,65,1,118,34,4,13,0,11,32,2,186,11,19,0,32,1,68,0,0,128,2,101,205,205,65,16,1,32,0,16,0,11,10,0,32,0,176,32,1,176,127,186,11";
const wasmCode = new Uint8Array(wasmString.split(","));
const wasmModule = new WebAssembly.Module(wasmCode, {});
const wasm = new WebAssembly.Instance(wasmModule);
const { mulMod, expMod, divMod, intDiv } = wasm.exports;
//
// Start
//
(async function main() {
  console.log("\x1b[32mEnter source file name:\x1b[33m");
  syncWithInput(readlineModule, process.stdin);
  const resultFileName = "result";
  const srcFile = await readLine();
  console.log(`\x1b[32mResult will be saved in \x1b[37m${resultFileName}`);
  console.log("\r\n");
  const filePath = path.join(__dirname, srcFile);
  syncWithInput(readlineModule, fs.createReadStream(filePath));
  // Start
  let data = await readArray();
  arrayToFile(data);
  data = await readArray();
  arrayToFile(data);

  outputFile.on("finish", () => process.exit());
  outputFile.end();
})().catch((err) => console.log(err));
