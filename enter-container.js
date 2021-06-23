const config = require("./config");
const exec = require("child_process").exec;
const containerName = `${config.CONTAINER_NAME_PREFIX || "wp_dev"}_wordpress`;
const { spawn } = require("child_process");

const containerQueryCommand = `docker ps -aqf "name=${containerName}"`;

exec(containerQueryCommand, function (error, containerId, stderr) {
  const shell = spawn(
    "docker",
    ["exec", "-u www-data", "-it", `${containerId.trim()}`, "/bin/bash"],
    {
      stdio: "inherit",
    }
  );

  shell.on("close", (code) => {
    console.log("[shell] terminated :", code);
  });
});
