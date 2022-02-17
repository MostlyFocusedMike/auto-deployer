const { exec } = require("child_process");

const getLogsForThisRelease = (logs, prevRelease = '') => {
  const logsArr = logs.split('\n');
  const prevTag = `tag: ${prevRelease}`;
  const prevReleaseIdx = logsArr.findIndex(log => log.search(prevTag) > 0);
  return logsArr.slice(0, prevReleaseIdx).join('\n');
}

const addProperTicket = (logs) => {
  const finalLogs = [];
  logs.split('\n').forEach(log => {
    const finalLog = log.trim().replace(/^\d{4}/, (num) => `[MKTG-${num}]`);
    if (finalLog === "Merge branch 'master' into develop") return;
    finalLogs.push(finalLog);
  });
  return finalLogs.join('\n');
}

const formatLogs = (logs) => {
  console.log(logs);
  console.log('----------------------------:', );
  const currentReleaseLogs = getLogsForThisRelease(logs, '1.1.0');
  const regex = /^[\w]{7}\s(?:\(.*\)\s)?/gm;
  const finalLogs = currentReleaseLogs.replace(regex, '');
  console.log(addProperTicket(finalLogs));
  return addProperTicket(finalLogs);
}

// exec("git log --oneline --decorate", (error, stdout, stderr) => {
//     if (error) {
//         console.log(`error: ${error.message}`);
//         return;
//     }
//     if (stderr) {
//         console.log(stderr);
//         return;
//     }
//     formatLogs(stdout)
// });

module.exports = {
  formatLogs
}
