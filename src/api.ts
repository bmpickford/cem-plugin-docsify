import { CustomElementManifest } from './customElementManifest';
import * as schema from './schema.js';
import Mustache from 'mustache';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

export abstract class APIDoc<T> {
    constructor(
        protected decleration: schema.Declaration,
        protected templatePath: string
    ) { }

    public generate(): string {
        const basePath = dirname(fileURLToPath(import.meta.url));
        const template = fs.readFileSync(`${basePath}/${this.templatePath}`, 'utf8');
        return Mustache.render(template, this.getData());
    };

    protected abstract getData(): T;
}

export class CustomElementAPIDoc extends APIDoc<schema.CustomElement> {
    constructor(protected decleration: schema.CustomElementDeclaration) {
        super(decleration, 'templates/api.element.mustache');
    }

    protected getData(): schema.CustomElement {
        return this.addUndefinedDefaultString(this.decleration);
    }

    private addUndefinedDefaultString(decleration: schema.CustomElementDeclaration): schema.CustomElementDeclaration {
        const data = Object.entries(this.decleration).map(([key, val]) => {
            if (!Array.isArray(val)) return [key, val]
            
            return [
                key,
                val.map((v) => {
                    if (!v.default) return { ...v, default: 'undefined' };
                    return v;
                }),
            ];
        });
        return Object.fromEntries(data);
    }
}