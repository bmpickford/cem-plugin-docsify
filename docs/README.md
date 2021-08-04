# `<my-element>`

## Installation
#### NPM
```bash
yarn add -D my-element
```

#### CDN
```bash
<script type="module" src="https://unpkg.com/my-element?module"></script>
```

## Usage
```html
<script type="module">
  import 'my-element/my-element.js';
</script>

<my-element></my-element>
```

<hr />

## Documentation


### Signature
`class MyElement extends HTMLElement { }`



### Attributes
|Name|Description|Default|Type|
|--|--|--|--|
|disabled|disables the element|`undefined`|`boolean`|
|foo|description for foo|`undefined`|`string`|

### Events
|Name|Description|Type|
|--|--|--|
|custom-event|some description for custom-event|`undefined`|
|typed-event|some description for typed-event|`Event`|
|typed-custom-event|some description for typed-custom-event|`MyCustomEvent`|

### Slots
|Name|Description|
|--|--|
|This|is a default&#x2F;unnamed slot|
|container|You can put some elements here|


### CSS Parts
|Name|Description|
|--|--|
|bar|Styles the color of bar|
