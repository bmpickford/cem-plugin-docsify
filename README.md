<h1 align="center">Welcome to @bmpickford/cem-plugin-docsify 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/bmpickford/cem-plugin-docsify#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/bmpickford/cem-plugin-docsify/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/bmpickford/cem-plugin-docsify/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/bmpickford/@bmpickford/cem-plugin-docsify" />
  </a>
</p>

> A custom-elements-manifest plugin that generates a docsify site for your element

### 🏠 [Homepage](https://github.com/bmpickford/cem-plugin-docsify#readme)

## Install

```sh
yarn add @bmpickford/cem-plugin-docsify
```

## Usage

```javascript
// file: custom-elements-manifest.config.mjs
import docsify from '@bmpickford/cem-plugin-docsify-gen';

export default {
  plugins: [
    docsify({ name: 'MyGreatCustomElement' }),
  ]
}
```

## Development
#### Installation
```sh
yarn install
```

#### Running
This will generate the docs for the example element found in `fixtures/default/sourcecode/default.js`
```sh
yarn start
```

#### Run tests

```sh
yarn run test
```

## Author

👤 **Benjamin Pickford**

* Website: https://benpickford.me/
* Github: [@bmpickford](https://github.com/bmpickford)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/bmpickford/cem-plugin-docsify/issues). You can also take a look at the [contributing guide](https://github.com/bmpickford/cem-plugin-docsify/blob/master/CONTRIBUTING.md).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2021 [Benjamin Pickford](https://github.com/bmpickford).<br />
This project is [MIT](https://github.com/bmpickford/cem-plugin-docsify/blob/master/LICENSE) licensed.