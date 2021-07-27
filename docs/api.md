#

# Attributes
|Name|Description|Default|Type|
|--|--|--|--|
|disabled|disables the element|`undefined`|`boolean`|
|foo|description for foo|`undefined`|`string`|

# Events
|Name|Description|Type|
|--|--|--|
|custom-event|some description for custom-event|``|
|typed-event|some description for typed-event|`Event`|
|typed-custom-event|some description for typed-custom-event|`MyCustomEvent`|

# Slots
|Name|Description|
|--|--|
|This|is a default&#x2F;unnamed slot|
|container|You can put some elements here|


# CSS Parts
|Name|Description|
|--|--|
|bar|Styles the color of bar|


<hr />


# Type Definitions
## Classes

#### MyCustomClassWithMixins
`class MyCustomClassWithMixins extends S`


##### Mixins
|Name|
|--|
|`B`|
|`A`|

##### Attributes
|Name|Kind|Description|Type|Default|
|--|--|--|--|--|
|myProperty|field|myProperty|`string`|`some string`|
|count|field|count|`number`|`N/A`|
|getCount|method|Gets the current count|`N/A`|`N/A`|
|setCount|method|Sets the count|`N/A`|`N/A`|

#### MyCustomEvent
`class MyCustomEvent extends CustomEvent`


## Functions

#### MyHelperFunction
`function MyHelperFunction(count: number): number`



## Variables

#### MyCustomElementName
`const MyCustomElementName`



#### MyTypedCustomElementName
`const MyTypedCustomElementName: string`

My element name, that includes JSDoc typings

