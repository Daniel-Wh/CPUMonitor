## CPU-Monitor

Simple cross platform desktop app built using Electron.js and a handful and OS-utils. <br> CPU-Monitor runs in the tray and monitors CPU-usage. User can generate a CPU usage threshold that will generate
notifications when the CPU usage exceeds the threshold. Initial threshold set to 80%. 

## How to install

You will need node.js installed on your machine in order to initiate the build. <br>
Clone the repo, after cloning the repo, run: npm install <br>
this will install the necessary dependencies. Now open the directory in a terminal and run the corresponding command that matches your operating system.<br>
Mac: npm run package-mac <br>
Win: npm run package-win <br>
lin: npm run package-linux <br>

a new folder will appear when the app is complete name release-builds. The executable application will be in that folder.
<br>
Once you have the app open, you can set the usage threshold and the notification timing. 
