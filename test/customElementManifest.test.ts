import { test, suite } from 'uvu';
import * as assert from 'uvu/assert';
import { CustomElementManifest } from '../src/customElementManifest';

import * as cem_1 from './cem/1.json'; 

const cemSuite = suite('cem');
cemSuite('constructs', () => {
    const cem = new CustomElementManifest(JSON.stringify(cem_1));
    assert.is.not(cem.instance, undefined);
});

cemSuite('gets custom elements exports', () => {
    const cem = new CustomElementManifest(JSON.stringify(cem_1));
    const customEls = cem.getCustomElementExports();
    assert.is.not(customEls, undefined);
    assert.is(customEls.length, 1);
});

cemSuite('gets custom elements declerations', () => {
    const cem = new CustomElementManifest(JSON.stringify(cem_1));
    const customEls = cem.getCustomElementsDeclerations();
    assert.is.not(customEls, undefined);
    assert.is(customEls.length, 1);
});

cemSuite('gets custom elements declerations', () => {
    const cem = new CustomElementManifest(JSON.stringify(cem_1));
    const customEls = cem.getTypeDeclerations();
    assert.is.not(customEls, undefined);
    assert.is(customEls.length, 0);
});

cemSuite.run();