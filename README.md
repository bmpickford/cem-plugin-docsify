<h1 align="center">🔌 cem-plugin-docsify 🔌</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.1.3-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/bmpickford/cem-plugin-docsify/blob/main/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/bmpickford/cem-plugin-docsify" />
  </a>
</p>

> A custom-elements-manifest plugin that generates a docsify site for your element

### [Demo](https://bmpickford.github.io/cem-plugin-docsify)

## Install

```sh
yarn add cem-plugin-docsify
```

## Usage

```javascript
// custom-elements-manifest.config.mjs
import docsify from 'cem-plugin-docsify';

export default {
  plugins: [
    docsify({ name: 'MyGreatCustomElement' }),
  ]
}
```

## Configuration
The plugin comes with several built in configuration options
```javascript
// custom-elements-manifest.config.mjs

docsify({
  // required
  // name of your docs page. This will appear at the top right 
  // of your docs sidebar
  name: 'MyGreatCustomElement',
  // optional. Default: ''
  // repo URL. If included a link to your repository will appear 
  // in the top right of the docs site
  repoURL: 'https://github.com/bmpickford/cem-plugin-docsify',
  // optional. Default: docs/
  // path to output doc files
  out: './docs',
  // optional. Default: false
  // if marked as true, will include an Examples link in
  // the sidebar, that will have an iframe that links
  // to './docs/storybook'. If you include this option it
  // is expected that there will be a built storybook docs
  // site in the docs folder
  includeStorybook: false,
  // optional. Default: 3000
  // docsify doesn't give many options for customizing embedded content
  // so the height needs to be static. Set to 3000 as a default but
  // this is here to modify if needed
  storybookHeight: 3000,
}),
```

#### Usage with Storybook
As seen in the demo, you can include your storybooks docs as an iFrame to easily provide tangible examples. To do this, you
will need to build your storybook docs (e.g. `build-storybook --docs`) and set the output to `docs/storybook` or alternatively manually copy it across.
Then apply this configuration to the plugin:

```javascript
// custom-elements-manifest.config.mjs

docsify({
  name: 'MyGreatCustomElementWithStorybookDocs',
  includeStorybook: true,
}),
```

It is also recommended to remove any navigation and panels from the storybook docs for a better user experience. This can be configured in .storybook/manager.js
##### [Storybook Configuration Docs](https://storybook.js.org/docs/react/configure/features-and-behavior)

For the demo, this was the configuration used:
```javascript
// .storybook/manager.js
import { addons } from '@storybook/addons';

addons.setConfig({
  showNav: false,
  showPanel: false,
  isFullscreen: true,
});
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

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/bmpickford/cem-plugin-docsify/issues)

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2021 [Benjamin Pickford](https://github.com/bmpickford).<br />
This project is [MIT](https://github.com/bmpickford/cem-plugin-docsify/blob/master/LICENSE) licensed.