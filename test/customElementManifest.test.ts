import { suite } from 'uvu';
import * as assert from 'uvu/assert';
import { CustomElementManifest } from '../src/customElementManifest.js';
import { manifest } from './setup.js';
import * as cem_no_export from './cem/no_exports.json';
import * as cem_no_modules from './cem/no_modules.json';

const cem = suite('customElementsManifest')
cem('constructs', () => {
    const cem = new CustomElementManifest(JSON.stringify(manifest));
    assert.not.equal(cem, undefined);
});

cem('gets custom elements exports', () => {
    const cem = new CustomElementManifest(JSON.stringify(manifest));
    const customEls = cem.getCustomElementExports();
    assert.not.equal(customEls, undefined);
    assert.equal(customEls.length, 1);
});

cem('gets custom elements declerations', () => {
    const cem = new CustomElementManifest(JSON.stringify(manifest));
    const customEls = cem.getCustomElementsDeclerations();
    assert.not.equal(customEls, undefined);
    assert.equal(customEls.length, 1);
});

cem('gets class declerations', () => {
    const cem = new CustomElementManifest(JSON.stringify(manifest));
    const decs = cem.getClassDeclerations();
    assert.not.equal(decs, undefined);
    assert.equal(decs.length, 2);
});

cem('gets function declerations', () => {
    const cem = new CustomElementManifest(JSON.stringify(manifest));
    const decs = cem.getFunctionDeclerations();
    assert.not.equal(decs, undefined);
    assert.equal(decs.length, 1);
});

cem('gets variable declerations', () => {
    const cem = new CustomElementManifest(JSON.stringify(manifest));
    const decs = cem.getVariableDeclerations();
    assert.not.equal(decs, undefined);
    assert.equal(decs.length, 2);
});
cem.run();

const cem_invalid = suite('customElementsManifest__invalid');
cem_invalid('no exports', () => {
    const cem = new CustomElementManifest(JSON.stringify(cem_no_export));
    const customEls = cem.getCustomElementExports();
    const classDecs = cem.getClassDeclerations();
    const functionDecs = cem.getFunctionDeclerations();
    const variableDecs = cem.getVariableDeclerations();
    assert.not.equal(customEls, undefined);
    assert.equal(customEls.length, 0);
    assert.equal(classDecs.length, 0);
    assert.equal(functionDecs.length, 0);
    assert.equal(variableDecs.length, 0);
});

cem_invalid('no modules', () => {
    const cem = new CustomElementManifest(JSON.stringify(cem_no_modules));
    const customEls = cem.getCustomElementExports();
    const classDecs = cem.getClassDeclerations();
    const functionDecs = cem.getFunctionDeclerations();
    const variableDecs = cem.getVariableDeclerations();
    assert.not.equal(customEls, undefined);
    assert.equal(customEls.length, 0);
    assert.equal(classDecs.length, 0);
    assert.equal(functionDecs.length, 0);
    assert.equal(variableDecs.length, 0);
});
cem_invalid.run();
