const parseUsage = (pkgName, decleration) => {
return `
#
# Installation
#### NPM

\`yarn add ${pkgName}\`

#### CDN
\`<script type="module" src="https://unpkg.com/${pkgName}?module"></script>\`

# Component Usage
This is for usage without any frameworks but should be able to be adapted to any framework with a couple extra steps. 

See [this list](https://custom-elements-everywhere.com/) for any possible compatibility issues

\`\`\`html
<html>
<body>
    <script>
        import '${pkgName}';
    </script>

    ${basicUsage(decleration)}
</body>
</html>
\`\`\`

${attributes(decleration)}

${events(decleration)}

${classes(decleration)}

${cssTheme(decleration)}
`
}

const attributes = (decleration) => {
    if (!decleration.attributes) return '';

    console.log('[cem-plugin-docsify] Found Attributes')
    return `# Setting Attributes
\`\`\`html
<script>
    const el = document.querySelector('${decleration.tagName}');
    el.${decleration.attributes[0].name} = ${getAValueForType(decleration.attributes[0].type?.text)};
</script>
\`\`\`
`;
}

const events = (decleration) => {
    const exampleEvent = decleration?.events?.find((m) => m.name !== undefined);
    if (!exampleEvent) return '';

    console.log('[cem-plugin-docsify] Found Events')
    return `# Events
Events are sent as a [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent) dispatched on the custom element. For a full list of events attribute see the [api](api?id=events)
\`\`\`html
<script>
    const el = document.querySelector('${decleration.tagName}');
    el.addEventListener('${exampleEvent.name}', (event) => console.log('💯. Here\\'s what was sent', event.detail));
</script>
\`\`\`
`;
}

const cssTheme = (decleration) => {
    const exampleCSS = decleration?.cssProperties?.find((m) => m.name !== undefined);
    if (!exampleCSS) return '';
    
    console.log('[cem-plugin-docsify] Found CSS')
    return `# Themeing - CSS Vars
Theming can be done through the use of CSS variables. For a full list of themable attribute see the [api](api?id=css-props-and-theming)
\`\`\`css
${decleration.tagName} {
    ${exampleCSS.name}: unset;
}
\`\`\`
`;
}

const classes = (decleration) => {
    const exampleClass = decleration?.cssParts?.find((m) => m.name !== undefined);
    if (!exampleClass) return '';
    
    console.log('[cem-plugin-docsify] Found Classes')
    return `# Theming - Class Names
Theming can be done through the use of class name. For a full list of themable attribute see the [api](api?id=classes)
\`\`\`html
<${decleration.tagName} class="${exampleClass.name}"></${decleration.tagName}>
\`\`\`
`;
}

const basicUsage = (decleration) => {
    if (!decleration?.slots) return `<${decleration.tagName}></${decleration.tagName}>`;

    const slotsMD = decleration.slots.map((s) => {
        const comment = s.description ? `<!-- ${s.description} -->\n\t\t` : '';
        return `${comment}<span${s.name ? ` name="${s.name}"` : ''}>Heres some content!</span>`
    }).join('\n\t\t');
    console.log('[cem-plugin-docsify] Found Slots');
    
    return `<${decleration.tagName}>\n\t\t${slotsMD}\n\t</${decleration.tagName}>`;
}

const getAValueForType = (type) => {
    switch(type) {
        case 'string':
            return '"some value"';
        case 'number':
            return '1';
        case 'boolean':
            return 'false';
        case 'object':
            return '{}';
        default:
            return type;
    }
}


export default parseUsage;