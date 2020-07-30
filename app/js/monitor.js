const path = require("path");
const osu = require("node-os-utils");
const cpu = osu.cpu;
const mem = osu.mem;
const os = osu.os;

let cpuOverload = 5;

//run every 2 secs
setInterval(() => {
  // CPU usage
  cpu.usage().then((info) => {
    document.getElementById("cpu-usage").innerText = `${info}%`;

    // select progress bar
    document.getElementById("cpu-progress").style.width = `${info}%`;
    document.getElementById("cpu-progress").style.background =
      info > cpuOverload ? "red" : "#30c88b";

    document.getElementById("cpu-progress-icon").style.color =
      info > cpuOverload ? "red" : "#30c88b";
  });
  // cpu free
  cpu.free().then((info) => {
    document.getElementById("cpu-free").innerText = `${info}%`;
  });

  document.getElementById("sys-uptime").innerText = secondsToDHMS(os.uptime());
}, 2000);

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

//show days/hours/mins/seconds
function secondsToDHMS(seconds) {
  seconds = +seconds;
  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor((seconds % (3600 * 24)) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  return `${d}d, ${h}h, ${m}m, ${s}s`;
}
