const { exec } = require("child_process");

const getLogsForThisRelease = (logs, previousVersion = '') => {
  const logsArr = logs.split('\n');
  const upToIndex = logsArr.findIndex(log => log.search(`tag: ${previousVersion}`) > 0)
  const releaseLogs = logsArr.slice(0, upToIndex)
  console.log('logsArr:', );
  return releaseLogs.join('\n');
}

const formatLogs = (logs) => {
  console.log('RAW LOGS:');
  console.log(logs);
  console.log('----------------------------:', );
  const currentReleaseLogs = getLogsForThisRelease(logs, '1.1.0');
  const finalLogs = currentReleaseLogs.replace(/^[\w]{7}\s(?:\(.*\)\s)?/gm, '')
  console.log('RAW LOGS:');
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