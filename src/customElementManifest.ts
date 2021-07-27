import * as schema from './schema.js';

enum ExportType { 
    JS = 'js',
    CUSTOM_ELEMENT = 'custom-element-definition',
}

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
    return value !== null && value !== undefined;
}

export class CustomElementManifest {
    public instance: schema.Package;

    private _allExports: schema.Export[] = [];
    private _allDeclerations: schema.Declaration[] = [];

    constructor(cem: string | schema.Package) {
        if (typeof cem === 'string') this.instance = JSON.parse(cem);
        else this.instance = cem;
        if (!this.instance.modules) return;
        this._allExports = this.instance.modules.flatMap((m) => m.exports).filter(notEmpty);
        this._allDeclerations = this.instance.modules.flatMap((m) => m.declarations).filter(notEmpty);;
    }

    public getCustomElementsDeclerations(): schema.CustomElementDeclaration[] {
        const exportNames = this.getCustomElementExports().map((e) => e.declaration.name);
        return this._allDeclerations.filter((decleration) => {
            return exportNames.includes(decleration.name);
        }) as schema.CustomElementDeclaration[];
    }

    public getCustomElementExports(): schema.CustomElementExport[] {
        return this._allExports.filter((e) => e.kind === ExportType.CUSTOM_ELEMENT) as schema.CustomElementExport[];
    }

    public getClassDeclerations(): schema.ClassDeclaration[] {
        return this._allDeclerations.filter((d) => d.kind === 'class' && !(d as any).customElement) as schema.ClassDeclaration[];
    }

    public getMixinDeclerations(): schema.MixinDeclaration[] {
        return this._allDeclerations.filter((d) => d.kind === 'mixin') as schema.MixinDeclaration[];
    }

    public getVariableDeclerations(): schema.VariableDeclaration[] {
        return this._allDeclerations.filter((d) => d.kind === 'variable') as schema.VariableDeclaration[];
    }

    public getFunctionDeclerations(): schema.FunctionDeclaration[] {
        return this._allDeclerations.filter((d) => d.kind === 'function') as schema.FunctionDeclaration[];
    }
}