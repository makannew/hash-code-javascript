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
const fs = require("fs");
const path = require("path");
const readlineModule = require("readline");

class InputStream {
  constructor(inputSrc) {
    if (!inputSrc) {
      this.inputSrc = process.stdin;
    } else {
      const srcFilePath = path.join(__dirname, inputSrc);
      this.inputSrc = fs.createReadStream(srcFilePath);
    }
    this.syncWithInput(readlineModule);
  }
  inputBuffer = [];
  inputSrc;
  nullFunc = () => null;
  checkAvailableInput = this.nullFunc;

  syncWithInput(readlineModule) {
    this.inputBuffer = [];
    const readInputLine = readlineModule.createInterface({
      input: this.inputSrc,
    });
    readInputLine.on("line", (input) => {
      const lines = input.split("/n");
      lines.forEach((line) => this.inputBuffer.push(line.trim()));
      this.checkAvailableInput();
    });
  }

  async readLine() {
    return new Promise((resolve) => {
      this.checkAvailableInput = () => {
        if (this.inputBuffer.length > 0) {
          this.checkAvailableInput = this.nullFunc;
          resolve(this.inputBuffer.shift());
        }
      };
      this.checkAvailableInput();
    });
  }

  async readArray() {
    const newLine = await this.readLine();
    const inputArray = newLine.split(" ");
    return inputArray;
  }

  async readIntArray() {
    const data = await this.readArray();
    for (let i in data) {
      data[i] = parseInt(data[i], 10);
    }
    return data;
  }
}

class OutputStream {
  constructor(filename) {
    this.outputFile = fs.createWriteStream(filename, {
      flags: "w",
    });
  }

  outputFile;
  resolvePromise = () => null;

  arrayToFile(data) {
    this.lineToFile(data.join(" "));
  }

  lineToFile(data) {
    this.outputFile.write(data);
    this.outputFile.write("\n");
  }

  async finish() {
    const resolvablePromise = new Promise((resolve) => {
      this.resolvePromise = () => resolve();
    });
    this.outputFile.on("finish", this.resolvePromise);
    this.outputFile.end();
    return resolvablePromise;
  }
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
  const [node, indexJs, srcFile, resultFile] = process.argv;
  const cmdLine = new InputStream();
  console.log(
    "\x1b[32mS for save the result and Q for exit without saving\x1b[33m"
  );
  const srcStream = new InputStream(srcFile);
  let resultStream;
  //
  //
  //
  //
  const [D, I, S, V, F] = await srcStream.readIntArray();

  // streets
  const intersecs = [];
  for (let i = 0; i < I; ++i) {
    intersecs.push([]);
  }
  const streets = [];
  for (let i = 0; i < S; ++i) {
    const [B, E, name, dur] = await srcStream.readArray();
    const startIntersec = Number(B);
    const endIntersec = Number(E);
    const duration = Number(dur);
    const inStIdx =
      streets.push({
        name,
        duration,
        startIntersec,
        endIntersec,
        used: false,
      }) - 1;
    intersecs[endIntersec].push({ inStIdx, queue: [], onTime: 0 });
  }
  // trips
  const trips = [];
  for (let i = 0; i < V; ++i) {
    const [streetsNum, ...carTrips] = await srcStream.readArray();
    const thisTrip = [];
    let duration = 0;
    carTrips.forEach((trp) => {
      let idx;
      streets.find((st, index) => {
        if (st.name === trp) {
          idx = index;
          return true;
        }
      });
      duration += streets[idx].duration;
      thisTrip.push(idx);
    });
    if (duration <= D) {
      trips.push({ streets: thisTrip, duration });
    }
  }
  // remove unused trafic lights
  for (let trip of trips) {
    for (let stIdx of trip.streets) {
      streets[stIdx].used = true;
    }
  }

  for (let i = 0; i < I; ++i) {
    intersecs[i] = intersecs[i].filter(
      (tLight) => streets[tLight.inStIdx].used
    );
  }
  // reorder
  function reOrder() {
    for (let i = 0; i < I; ++i) {
      if (intersecs[i].length > 1) {
        intersecs[i].unshift(intersecs[i].pop());
      }
    }
  }
  // initialize with random numbers
  function randomize(span) {
    for (let i = 0; i < I; ++i) {
      const t = intersecs[i].length;
      let remain = span;
      for (let j = 0; j < t; ++j) {
        if (j === t - 1) {
          intersecs[i][j].onTime = remain;
        } else {
          const thisT = Math.round((remain * Math.random()) / t);
          intersecs[i][j].onTime = thisT;
          remain = remain - thisT;
        }
      }
    }
  }

  // task loop
  // q(Enter) for quit without save and any other keys(Enter) save the data
  function taskLoop() {
    reOrder();
    let span = Math.floor(Math.random() * D);
    span = span ? span : 1;
    randomize(span);
    //
    // Loop computation tasks
    //
  }
  // put save logic here
  function saveData() {
    let numberOfI = 0;
    for (let i = 0; i < I; ++i) {
      if (intersecs[i].length) {
        numberOfI++;
      }
    }
    resultStream.arrayToFile([numberOfI]);
    //
    for (let i = 0; i < I; ++i) {
      if (intersecs[i].length) {
        resultStream.arrayToFile([i]);
        resultStream.arrayToFile([intersecs[i].length]);
        for (let tLight of intersecs[i]) {
          resultStream.arrayToFile([
            streets[tLight.inStIdx].name,
            tLight.onTime,
          ]);
        }
      }
    }
  }
  //
  //
  //
  //
  //
  //
  //
  //
  let exitTheProgram = false;
  function taskLoopParent() {
    taskLoop();
    if (!exitTheProgram) {
      setTimeout(taskLoopParent, 0);
    }
  }
  taskLoopParent();
  //
  async function saveToResultFile() {
    console.log("start saving");
    resultStream = new OutputStream(resultFile ? resultFile : `${srcFile}.res`);
    saveData();
    await resultStream.finish();
    console.log("finished");
  }
  //
  async function waitForKey() {
    const enteredKey = await cmdLine.readLine();
    if (enteredKey == "q") {
      exitTheProgram = true;
    } else {
      await saveToResultFile();
      await waitForKey();
    }
  }
  await waitForKey();
  process.exit();
})().catch((err) => console.log(err));
