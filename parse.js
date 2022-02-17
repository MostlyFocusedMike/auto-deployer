const { exec } = require("child_process");

const getLogsForThisRelease = (logs, previousVersion) => {
  return logs;
}

const formatLogs = (logs) => {
  console.log(logs);
  const currentReleaseLogs = getLogsForThisRelease(logs, '1.0.0');
  const finalLogs = currentReleaseLogs.replace(/^[\w]{7}\s(?:\(.*\)\s)?/gm, '')
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