import fs from 'fs';
import ts from 'typescript';
// @ts-ignore
import { create } from '@custom-elements-manifest/analyzer/src/create.js';

const myCustomElement = fs.readFileSync('fixtures/default/sourcecode/default.js').toString();
const myCustomEvents = fs.readFileSync('fixtures/default/sourcecode/events.js').toString();

const modules = [
  ts.createSourceFile(
    'my-element.js',
    myCustomElement,
    ts.ScriptTarget.ES2020,
    true,
  ),
  ts.createSourceFile(
    'events.js',
    myCustomEvents,
    ts.ScriptTarget.ES2020,
    true,
  ),
];

export const manifest = create({
  modules,
  dev: true,
});