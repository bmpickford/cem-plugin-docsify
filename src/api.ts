import * as schema from './schema.js';
import Mustache from 'mustache';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { CustomElementManifest } from './customElementManifest.js';

export abstract class APIDoc<T> {
    public static generateAllDocs(manifest: CustomElementManifest) {

        const customElDoc = new CustomElementAPIDoc(manifest.getCustomElementsDeclerations()[0] as schema.CustomElementDeclaration);
        const typeDocs: Array<APIDoc<any>> = [
            new ClassesAPIDoc(manifest.getClassDeclerations()),
            new FunctionsAPIDoc(manifest.getFunctionDeclerations()),
            new MixinsAPIDoc(manifest.getMixinDeclerations()),
            new VariablesAPIDoc(manifest.getVariableDeclerations()),
        ];

        return customElDoc.generate() + '\n\n' + typeDocs.reduce((prev, curr) => {
            return prev + curr.generate();
        }, '<hr />\n\n\n# Type Definitions\n');
    }

    constructor(
        protected decleration: schema.Declaration | schema.Declaration[],
        protected templatePath: string
    ) { }

    public generate(): string {
        if (!this.decleration || (Array.isArray(this.decleration) && this.decleration.length === 0)) return '';
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
        return this.addUndefinedDefaultString();
    }

    private addUndefinedDefaultString(): schema.CustomElementDeclaration {
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

export class ClassesAPIDoc extends APIDoc<{ classes: schema.ClassDeclaration[] }> {
    constructor(protected decleration: schema.ClassDeclaration[]) {
        super(decleration, 'templates/api.classes.mustache');
    }

    protected getData(): { classes: schema.ClassDeclaration[] } {
        return { classes: this.decleration };
    }
}

export class FunctionsAPIDoc extends APIDoc<{ functions: schema.FunctionDeclaration[] }> {
    constructor(protected decleration: schema.FunctionDeclaration[]) {
        super(decleration, 'templates/api.functions.mustache');
    }

    protected getData(): { functions: schema.FunctionDeclaration[] } {
        return { functions: this.decleration };
    }
}

// TODO: this
export class MixinsAPIDoc extends APIDoc<schema.MixinDeclaration[]> {
    constructor(protected decleration: schema.MixinDeclaration[]) {
        super(decleration, 'templates/api.mixins.mustache');
    }

    public generate(): string {
        return '';
    }

    protected getData(): schema.MixinDeclaration[] {
        return this.decleration;
    }
}

export class VariablesAPIDoc extends APIDoc< { variables: schema.VariableDeclaration[] }> {
    constructor(protected decleration: schema.VariableDeclaration[]) {
        super(decleration, 'templates/api.variables.mustache');
    }

    protected getData():  { variables: schema.VariableDeclaration[] } {
        return { variables: this.decleration };
    }
}