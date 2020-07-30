const path = require("path");
const osu = require("node-os-utils");
const cpu = osu.cpu;
const mem = osu.mem;
const os = osu.os;

// set model

document.getElementById("cpu-model").innerText = cpu.model();

// Computer name

document.getElementById("comp-name").innerText = os.hostname();

// OS
document.getElementById("os").innerText = `${os.type()} ${os.arch()}`;

// Total mem
mem.info().then((info) => {
  document.getElementById("mem-total").innerText = `${info.totalMemMb} GB`;
});
