import { suite, test } from 'uvu';
import * as assert from 'uvu/assert';
import { CustomElementManifest } from '../src/customElementManifest.js';
import cem_1 from './cem/1.json';

// test('something', () => {
//     assert.equal(1, 2);
// });

const cem = suite('customElementsManifest')
cem('constructs', () => {
    const cem = new CustomElementManifest(JSON.stringify(cem_1));
    assert.not.equal(cem, undefined);
});

cem('gets custom elements exports', () => {
    const cem = new CustomElementManifest(JSON.stringify(cem_1));
    const customEls = cem.getCustomElementExports();
    assert.not.equal(customEls, undefined);
    assert.equal(customEls.length, 1);
});

cem('gets custom elements declerations', () => {
    const cem = new CustomElementManifest(JSON.stringify(cem_1));
    const customEls = cem.getCustomElementsDeclerations();
    assert.not.equal(customEls, undefined);
    assert.equal(customEls.length, 1);
});

cem('gets custom elements declerations', () => {
    const cem = new CustomElementManifest(JSON.stringify(cem_1));
    const customEls = cem.getTypeDeclerations();
    assert.not.equal(customEls, undefined);
    assert.equal(customEls.length, 0);
});
cem.run();