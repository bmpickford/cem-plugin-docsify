import fs from 'fs';
import path from 'path';
import GetDocsifySource from './docsify/src.js';
import parseUsage from './usage.js';

const packageJsonPath = `${process.cwd()}${path.sep}package.json`;
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath).toString());

const readmMePath = `${process.cwd()}${path.sep}README.md`;
const readme = fs.readFileSync(readmMePath).toString();

const CSSMarkdown = (CSSProps) => {
  const title = '# CSS Properties'
  const header = '|Name|Description|Default|\n|--|--|--|';
  const content = CSSProps.map((c) => `|${c.name}|${c.description}|\`${c.default}\`|`).join('\n');

  return `${title}\n${header}\n${content}`;
}

const EventsMarkdown = (EventsProps) => {
  const title = '# Events'
  const header = '|Name|Description|Type|\n|--|--|--|';
  const content = EventsProps.map((c) => 
    `|${c.name}|${c.description}|${c.type ? `[${c.type.text}](api?id=${c.type.text})|` : '|'}`
  ).join('\n');

  return `${title}\n${header}\n${content}`;
}

const AttributesMarkdown = (AttrProps) => {
  const title = '# Attributes'
  const header = '|Name|Description|Default|Type|\n|--|--|--|--|';
  const content = AttrProps.map((c) => 
    `|${c.name}|${c.description}|\`${c.default}\`|${c.type ? `[${c.type.text}](api?id=${c.type.text})|` : ''}`
  ).join('\n');

  return `${title}\n${header}\n${content}`;
}

const parseCustomElementModule = (ce) => {
  const CSSPROP_DEF = 'cssProperties';
  const EVENT_DEF = 'events';
  const ATTR_DEF = 'attributes';

  return ce.declarations.map((declaration) => {
    const _cssProps = declaration[CSSPROP_DEF];
    const _events = declaration[EVENT_DEF];
    const _attr = declaration[ATTR_DEF];

    const cssPart = CSSMarkdown(_cssProps);
    const eventsPart = EventsMarkdown(_events);
    const attrPart = AttributesMarkdown(_attr);

   return `#\n\n${eventsPart}\n\n${attrPart}\n\n${cssPart}\n`;
  });
}

const parseAPI = (cem) => {
  
  const DEF_CUSTOM_ELEMENT = 'custom-element-definition';
  const modules = cem.modules;
  if (!modules) return;

  let customElOutput = '';
  let typesOutput = '';

  modules.forEach((m) => {
    if (!m.exports) return;
    const exportDefinition =  m.exports.find((e) => e?.kind === DEF_CUSTOM_ELEMENT);
    if (exportDefinition) {
      customElOutput += parseCustomElementModule(m);
      return;
    }

    if (!m.declarations || m.declarations.length === 0) return;

    typesOutput += m.declarations.map((d) => {
      const name = d.name;
      const nameExtends = d.superclass?.name;
      const kind = d.kind;
      const members = d.members ? d.members.filter((member) => member.privacy === 'public') : [];
  
      const heading = `## ${name}\n#### Signature\n\`${kind} ${name} ${nameExtends ? `extends ${nameExtends}` : ''} { }\`\n`;
      const description = d.description ? `#### Description\n${d.description}\n` : '';
      if (!members || members.length === 0) return `${heading}${description}\n`;
      
      const classTableHeader = '#### Parameters\n|Name|Type|\n|--|--|\n';
      const classTableContent = members.map((member) => {
        return `|${member.name}|\`${member.type?.text}\`|`;
      }).join('\n');
      return `${heading}${description}${classTableHeader}${classTableContent}\n`;
    }).join('\n');
  });
  return `${customElOutput}\n# Types\n${typesOutput}`;
}

const docPlugin = () => {
  return {
    name: 'docsify',
    packageLinkPhase: ({ customElementsManifest }) => {
      
      const name = packageJson.name;
      const description = packageJson.description;
      const version = packageJson.version;
      const repo = packageJson.repository?.url;
      let repoUrl = '';
      if (repo && repo.includes('git+')) repoUrl = repo.slice(4);

      // src
      const src = GetDocsifySource(name, repoUrl);

      // _sidebar.md
      const sidebarMD = `- [Home](/)\n- [Usage](usage.md)\n- [API](api.md)`

      // summary
      
      // usage
      // TODO: multiple els
      let usage;
      const el = customElementsManifest.modules.forEach((m) => {
        const customElementExport = m.exports.find((e) => e.kind === 'custom-element-definition');
        if (customElementExport) {
          const customElementDecleration = m.declarations.find((d) => d.name === customElementExport.declaration.name);
          usage = parseUsage(name, customElementDecleration);
        }
      });
      // const usage = 

      // api
      const api = parseAPI(customElementsManifest);

      fs.writeFileSync('./docs/README.md', readme, 'utf8');
      fs.writeFileSync('./docs/api.md', api, 'utf8');
      fs.writeFileSync('./docs/usage.md', usage, 'utf8');
      fs.writeFileSync('./docs/index.html', src, 'utf8');
      fs.writeFileSync('./docs/_sidebar.md', sidebarMD, 'utf8');
    },
  }
}

export default docPlugin;