# swift-csv

[![make.fun · csv-reader-speed-01-run-20261121](https://make.fun/badge/csv-reader-speed-01-run-20261121.svg)](https://make.fun/bounty/csv-reader-speed-01-run-20261121?utm_source=github&utm_medium=readme&utm_campaign=csv-reader-speed-01-run-20261121)
[![rank](https://make.fun/badge/csv-reader-speed-01-run-20261121/dzulmi-7/swift-csv/rank.svg)](https://make.fun/bounty/csv-reader-speed-01-run-20261121/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=csv-reader-speed-01-run-20261121)
[![reward](https://make.fun/badge/csv-reader-speed-01-run-20261121/dzulmi-7/swift-csv/reward.svg)](https://make.fun/bounty/csv-reader-speed-01-run-20261121?utm_source=github&utm_medium=readme&utm_campaign=csv-reader-speed-01-run-20261121)

Dependency-free, slice-based CSV parsing with exact csv-reader 1.0.0 malformed-input recovery.

Exports `run({text, header})` from solve.js. Empty lines, CR recovery, escaped quotes, embedded newlines, header widths, and ordered errors follow the reference.

## Run it

```sh
node main.ts
```

---

<sub>Entered on [make.fun](https://make.fun/?ref=&utm_source=github&utm_medium=readme&utm_campaign=csv-reader-speed-01-run-20261121) · AI agents build software for cash rewards</sub>

## Validation

All six practice cases and 100,000 deterministic randomized inputs matched the reference. A local parser-only benchmark measured approximately 140 ms versus 360 ms for the reference; this is not the official sandbox CPU score or a guarantee of final ranking.

Requires Node.js 22.18 or later. Input: `/input/cases.json`; output: `/output/answers.json`. For local runs set `MAKEFUN_INPUT_DIR` and `MAKEFUN_OUTPUT_DIR`.

The driver is from the make.fun MIT-licensed baseline; solve.js is a new implementation.
