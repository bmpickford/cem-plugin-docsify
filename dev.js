import fs from 'fs';
import ts from 'typescript';
import { create } from '@custom-elements-manifest/analyzer/src/create.js';
import docsify from './dist/index.js';

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

create({modules, plugins: [docsify({ name: 'myplugin', repoURL: 'https://github.com/bmpickford/cem-plugin-docsify' })]});

// console.log(JSON.stringify();
