import { CustomElementManifest } from './customElementManifest.js';
import Mustache from 'mustache';
import fs from 'fs';
import path from 'path';
import { Plugin } from '@custom-elements-manifest/analyzer';
import { APIDoc } from './api.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

/**
 * @interface PluginProps
 * 
 * @param {string} name Name of doc site
 * @param {string} [repoURL=''] URL of the repository
 * @param {string} [out='docs/'] Output directory
 * @param {boolean} [includeStorybook=false] include link to storybook docs in sidebar
 * @param {number} [storybookHeight=3000] static height in pixels for storybook docs
 */
interface PluginProps {
    name: string;
    repoURL?: string;
    out?: string;
    includeStorybook?: boolean;
    storybookHeight?: number;
}

const plugin = (props: PluginProps): Plugin => {
    const { name, repoURL, out = 'docs/', includeStorybook = false, storybookHeight = 3000} = props;
    const __dirname = path.resolve();
    const __distDir = dirname(fileURLToPath(import.meta.url));

    return {
        name: 'docsify',
        packageLinkPhase: ({ customElementsManifest, context }) => {
            const docsDir = `${__dirname}/${out}`;
            if (context.dev) console.log('[cem-plugin-docisfy] supplied configuration: ', props);
            if (context.dev) console.log('[cem-plugin-docisfy] output directory: ', docsDir);
            const manifest = new CustomElementManifest(customElementsManifest);

            const customElDeclerations = manifest.getCustomElementsDeclerations();
            if (context.dev) console.log(`[cem-plugin-docisfy] Found exported custom elements: ${customElDeclerations.map((c) => `<${c.tagName}>`).join(', ')}`)

            if (customElDeclerations.length > 1) {
                throw Error(`[cem-plugin-docsify] This plugin doesn\'t currently support multiple exported custom elements. Found ${customElDeclerations.length}`);
            }

            if (includeStorybook) {
                console.log('[cem-plugin-docsify] ⚠️ You\'ve indicated that you want to include storybook. You will need to export or copy your built storybook docs to docs/storybook ⚠️')
            }

            const customElDecleration = customElDeclerations[0];

            // Doscsify index
            const indexTemplate = fs.readFileSync(`${__distDir}/templates/index.html.mustache`, 'utf8');
            const index = Mustache.render(indexTemplate, { name, repoURL, description: '', includeStorybook });

            // Sidebar
            const sidebarTemplate = fs.readFileSync(`${__distDir}/templates/_sidebar.md.mustache`, 'utf8');
            const sidebar = Mustache.render(sidebarTemplate, { includeStorybook });

            // Home page
            const readmeTemplate = fs.readFileSync(`${__distDir}/templates/README.md.mustache`, 'utf8');
            const readme = Mustache.render(readmeTemplate, { tagName: customElDecleration.tagName });

            // API
            const apidoc = APIDoc.generateAllDocs(manifest);

            // Init out dir
            if (!fs.existsSync(docsDir)){ fs.mkdirSync(docsDir) };
            fs.writeFileSync(`${docsDir}/index.html`, index, 'utf8');
            fs.writeFileSync(`${docsDir}/_sidebar.md`, sidebar, 'utf8');
            fs.writeFileSync(`${docsDir}/README.md`, readme, 'utf8');
            if (includeStorybook) {
                const examples = `[Examples](storybook/index.html ':include :type=iframe width=100% height=${storybookHeight}')`
                fs.writeFileSync(`${docsDir}/examples.md`, examples, 'utf8');
            }

            if (apidoc) fs.writeFileSync(`${docsDir}/api.md`, apidoc, 'utf8');
        }
    }
};

export default plugin;