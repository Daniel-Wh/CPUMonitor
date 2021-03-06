const path = require("path");
const osu = require("node-os-utils");
const cpu = osu.cpu;
const mem = osu.mem;
const os = osu.os;
const { ipcRenderer } = require("electron");

let cpuOverload = 50;
let alertFrequency = 5;

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
    // check overload notification
    if (info >= cpuOverload && runNotify(alertFrequency)) {
      notifyUser({
        title: "CPU Overload",
        body: `CPU is over ${cpuOverload}%`,
        icon: path.join(__dirname, "img", "icon.png"),
      });
      localStorage.setItem("lastNotify", +new Date());
    }
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
// navigation
const nav = document.getElementById("nav");
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

// send notification
function notifyUser(options) {
  new Notification(options.title, options);
}

// check how much time has passed since notifcation
function runNotify(frequency) {
  if (!localStorage.getItem("lastNotify")) {
    localStorage.setItem("lastNotify", +new Date());
    return true;
  }
  const notifyTime = new Date(parseInt(localStorage.getItem("lastNotify")));
  const now = new Date();
  const diffTime = Math.abs(now - notifyTime);
  const minutesPassed = Math.ceil(diffTime / (1000 * 60));
  return minutesPassed > frequency;
}

// getting default/updated settings from main process
ipcRenderer.on("settings:get", (e, settings) => {
  document.getElementById("cpu-overload").value = settings.cpuOverload;
  cpuOverload = settings.cpuOverload;
  alertFrequency = settings.alertFrequency;
  document.getElementById("alert-frequency").value = settings.alertFrequency;
});

// send new settings to main
const settingsForm = document.getElementById("settings-form");
settingsForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const cpu = document.getElementById("cpu-overload").value;
  const alert = document.getElementById("alert-frequency").value;

  ipcRenderer.send("settings:set", {
    cpuOverload: cpu,
    alertFrequency: alert,
  });

  showAlert("settings saved");
});

// show alert for settings update
function showAlert(msg) {
  const alert = document.getElementById("alert");
  alert.classList.remove("hide");
  alert.innerText = msg;
  alert.classList.add("alert");

  setTimeout(() => {
    alert.classList.add("hide");
  }, 3000);
}

// receive nav toggle
ipcRenderer.on("nav:toggle", () => {
  nav.classList.toggle("hide");
});
