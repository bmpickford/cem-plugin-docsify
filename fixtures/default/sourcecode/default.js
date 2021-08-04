import { MyCustomEvent } from './events';

/**
 * @attr {boolean} disabled disables the element
 * @attribute {string} foo description for foo
 *
 * @csspart bar Styles the color of bar
 *
 * @slot This is a default/unnamed slot
 * @slot container You can put some elements here
 *
 * @cssprop --text-color Controls the color of foo
 * @cssproperty [--background-color=red] Controls the color of bar
 *
 * @prop {boolean} prop1 some description
 * @property {number} prop2 some description
 *
 * @fires custom-event some description for custom-event
 * @fires {Event} typed-event some description for typed-event
 * @event {MyCustomEvent} typed-custom-event some description for typed-custom-event
 *
 * @summary This is MyElement
 *
 * @tag my-element
 * @tagname my-element
 * 
 * @source https://github.com/bmpickford/cem-plugin-docsify
 */
export class MyElement extends HTMLElement {
  constructor() {
    new MyCustomEvent();
  }
}

class B { }
class A { }

class S { }

/**
 * @description class with various mixins and properties
 */
export class MyCustomClassWithMixins extends B(A(S)) {
  /**
   * my string
   * @type {string} myProperty
   */
  myProperty = 'some string';

  /**
   * counter
   * @type {number} count
   */
  count;

  constructor(prop1) {
    this.myProperty = prop1 || 'something else';
  }

  /**
   * Gets the current count
   * @returns {number}
   */
  getCount() {
    return this.count;
  }

  /**
   * Sets the count
   * @param {number} count 
   */
  setCount(count) {
    this.count = count;
  }
}

/**
 * 
 * @param {number} count 
 * @returns {number}
 * 
 * @description Adds 1 to the count
 */
export function MyHelperFunction(count) {
  return count + 1;
}

export const MyCustomElementName = 'my-element';

/**
 * @type {string} My element name, that includes JSDoc typings
 * @const
 */
export const MyTypedCustomElementName = 'my-element';

export const MyMixin = (base) => class extends base {
   foo() { return 0 }
 }

customElements.define('my-element', MyElement);
