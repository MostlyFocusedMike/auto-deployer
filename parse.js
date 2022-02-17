const { exec } = require("child_process");

const getLogsForLatestRelease = (logs) => {
  const logsArr = logs.split('\n');
  const releaseMsgStartingPattern = /\) RELEASE \d/;
  const isLogFromRelease = (log) => log.search(releaseMsgStartingPattern) > 0
  const prevReleaseIdx = logsArr.findIndex(isLogFromRelease);
  return logsArr.slice(0, prevReleaseIdx).join('\n');
}

const editLogEntries = (logs) => {
  // git hash, branch and tag metadata ie [ada19d1 (tag: 1.0.0) ]
  const gitMetaData = /^[\w]{7}\s(?:\(.*\)\s)?/gm;
  let formattedLogs = logs.replace(gitMetaData, '');

  const improperTicketFormat = /^\s?\d{4}/gm;
  formattedLogs = formattedLogs.replace(improperTicketFormat, (num) => `[MKTG-${num}]`);

  formattedLogs = formattedLogs.replace(/\nMerge branch 'master' into develop/g, '');
  return formattedLogs;
}

const formatLogs = (logs) => {
  const latestReleaseLogs = getLogsForLatestRelease(logs);
  return editLogEntries(latestReleaseLogs);
}

const run = () => {
  exec("git log --oneline --decorate", (error, stdout, stderr) => {
      if (error) {
          console.log(`error: ${error.message}`);
          return;
      }
      if (stderr) {
          console.log(stderr);
          return;
      }
      console.log(formatLogs(stdout));
  });
}

module.exports = {
  formatLogs,
  run,
}
