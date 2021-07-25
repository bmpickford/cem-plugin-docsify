import { CustomElementManifest } from './customElementManifest.js';
import Mustache from 'mustache';
import fs from 'fs';
import path from 'path';
import { Plugin } from '@custom-elements-manifest/analyzer';
import { CustomElementAPIDoc } from './api.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

interface PluginProps {
    name: string;
    repoURL?: string;
    out?: string;
    includeStorybook?: boolean;
}

const plugin = ({ name, repoURL, out = 'docs/', includeStorybook = false}: PluginProps): Plugin => {
    const __dirname = path.resolve();
    const __distDir = dirname(fileURLToPath(import.meta.url));

    return {
        name: 'docsify',
        packageLinkPhase: ({ customElementsManifest }) => {
            const docsDir = `${__dirname}/${out}`;
            const manifest = new CustomElementManifest(customElementsManifest);

            const declerations = manifest.getCustomElementsDeclerations();
            if (declerations.length > 1) {
                throw Error('This plugin doesn\'t currently support multiple exported custom elements');
            }

            if (includeStorybook) {
                console.log('[cem-plugin-docs-gen] ⚠️ You\'ve indicated that you want to include storybook. You will need to export or copy your built storybook docs to docs/storybook ⚠️')
            }

            const decleration = declerations[0];

            // Doscsify index
            const indexTemplate = fs.readFileSync(`${__distDir}/templates/index.html.mustache`, 'utf8');
            const index = Mustache.render(indexTemplate, { name, repoURL });

            
            // Sidebar
            const sidebarTemplate = fs.readFileSync(`${__distDir}/templates/_sidebar.md.mustache`, 'utf8');
            const sidebar = Mustache.render(sidebarTemplate, { includeStorybook });

            // Home page
            const readmeTemplate = fs.readFileSync(`${__distDir}/templates/README.md.mustache`, 'utf8');
            const readme = Mustache.render(readmeTemplate, { tagName: decleration.tagName });

            // API
            const API = new CustomElementAPIDoc(decleration);
            const APIDoc = API.generate();

            // Init out dir
            if (!fs.existsSync(docsDir)){ fs.mkdirSync(docsDir) };
            fs.writeFileSync(`${docsDir}/index.html`, index, 'utf8');
            fs.writeFileSync(`${docsDir}/_sidebar.md`, sidebar, 'utf8');
            fs.writeFileSync(`${docsDir}/README.md`, readme, 'utf8');

            if (APIDoc) fs.writeFileSync(`${docsDir}/api.md`, APIDoc, 'utf8');
        }
    }
};

export default plugin;