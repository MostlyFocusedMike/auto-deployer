const { exec } = require("child_process");

const formatLogs = (logs) => {
  console.log(logs);
  const finalLogs = logs.replace(/^[\w]{7}\s(?:\(.*\)\s)?/gm, '')
  console.log(finalLogs);
}

exec("git log --oneline --decorate", (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(stderr);
        return;
    }
    formatLogs(stdout)
});