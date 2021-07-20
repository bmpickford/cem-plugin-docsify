import fs from 'fs';
import ts from 'typescript';
import { create } from '@custom-elements-manifest/analyzer/src/create.js';
import myPlugin from './index.js';

const myCustomElement = fs.readFileSync('fixtures/default/sourcecode/default.js').toString();
const myCustomEvents = fs.readFileSync('fixtures/default/sourcecode/events.js').toString();

const modules = [
  ts.createSourceFile(
    'my-element.js',
    myCustomElement,
    ts.ScriptTarget.ES2015,
    true,
  ),
  ts.createSourceFile(
    'events.js',
    myCustomEvents,
    ts.ScriptTarget.ES2015,
    true,
  ),
];

create({modules, plugins: [myPlugin()]});

// console.log(JSON.stringify();
