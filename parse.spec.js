const { describe, it, expect } = require("@jest/globals")
const { formatLogs } = require("./parse")

describe("Parsing Tests", () => {
  it('it gets the right start', () => {
    const defaultLogs = `8e0b282 (HEAD -> main) install jest
9332a5e 6874 Add prefixes to ticket
bc528b2 [MKTG-6273] get basic script working
fd86448 [MKTG-7182] add nonsense
f467015 Merge branch 'master' into develop
7848a48 6729 add in new function
90fe98a clear out metadata from logs
90fe98a [No Ticket] Start 1.2.0
f467015 Merge branch 'master' into develop
c9dd23d (tag: ls, tag: 1.1.0) RELEASE 1.1.0
f467015 more new features
e64ff2e put in some new stuff
e1d9cf7 add feature
f019b09 (tag: 1.0.0) add new line
c7422a2 add test`

    const formattedLogs = `install jest
[MKTG-6874] Add prefixes to ticket
[MKTG-6273] get basic script working
[MKTG-7182] add nonsense
[MKTG-6729] add in new function
clear out metadata from logs
[No Ticket] Start 1.2.0`
    expect(formatLogs(defaultLogs, '1.1.0')).toBe(formattedLogs);
    expect(true).toBe(true);
  })
})