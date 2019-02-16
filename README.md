# Test Assignment :rocket:
Develop an automation test script suite for our Texas Pre-License Required - Law of Agency course for our real estate vertical.

## Requirements
1. [ ] Write test scripts testing key parts of the web app, including (but not limited to):
    - [x] Creation of a new account taking Law of Agency
    - [x] Purchase of the Law of Agency course
    - [x] Completing the profile information
    - [ ] Go through multiple pages of the course to test different features (no need to complete the full course)
2. [x] Report passing or failing tests in a clear way
3. [ ] Identify why a test failed
4. [ ] Report test failure to devs
5. [ ] Make sure to document the process and be prepared with all scripts ready to run the test
and give verdict of pass or fail.

## Extra Credit:
- [ ] Create a similar test on mobile
- [ ] Run the web test on different browsers
- [ ] Create a test outline and roadmap for any additional features
- [ ] Run the test using a cloud service like Sauce Labs or Browser Stack

#### Notes
- Staging URL: `ace-web-stg.herokuapp.com`

# Getting Started

## Prerequisites
```
node >= 11.6.0
yarn >= 1.13.0
```

## Installation

Install dependencies
```bash
$ yarn
```

# Running Tests
```bash
$ yarn test
```

## Generating Reports
```bash
$ yarn report
```

# Built With
- [Jest](https://jestjs.io/) - Delightful JavaScript Testing
- [Puppeteer](https://pptr.dev/) - Headless Chrome Node API
- [node](https://nodejs.org/en/) - JavaScript runtime built on Chrome's V8 JavaScript engine
- [jest-stare](https://dkelosky.github.io/jest-stare/) - Jest HTML Reporter and Results Processor

# Recommended Editor
We recommend using VS Code for debugging tests with the following extensions installed:
- Debugger for Chrome, Microsoft
- ESLint, Dirk Baeumer
- Jest, Orta

# Style Guide
[StandardJS](https://standardjs.com/)

# Helpful Links
- [Puppeteer API](https://github.com/GoogleChrome/puppeteer/blob/v1.12.2/docs/api.md)
- [expect-puppeteer](https://github.com/smooth-code/jest-puppeteer/tree/master/packages/expect-puppeteer)
- [faker](https://github.com/Marak/faker.js)
- [ndb](https://github.com/GoogleChromeLabs/ndb)

# Troubleshooting
 - [Jest Troubleshooting](https://jestjs.io/docs/en/troubleshooting)