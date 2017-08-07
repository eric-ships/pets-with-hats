# Pets with Hats

### Tech stack

| Technology                | Version     |
| ------------------------- | -----------:|
[node](https://nodejs.org/en/) | v8.2.1 |
[yarn](https://yarnpkg.com/en/) | 0.27.1 |
[npm](https://www.npmjs.com/) | 5.3.0 |

Feel free to choose either `yarn` or `npm`. Only one is required.

### Setup

Make sure you have the compatible versions of node and package manager.

Install packages through `yarn ` or `npm install`.

### Up & Running

To run locally in development:

`yarn start`

### Configuration

The following options are configurable.

- Number of original messages
- Number of responses
- Chance of error for GET /messages
- Chance of error for POST /messages

These options can be found in `config.js`.

### Linting

`yarn run eslint src`
`yarn run eslint src -- --fix`
