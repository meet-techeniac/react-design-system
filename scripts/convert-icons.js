const svgr = require('@svgr/core').default
const fs = require('fs')
const path = require('path')

const script = async () => {
  const base = 'src/assets/icons'

  let fileContents = `
import React from "react";

type IconProps = { color: string };

  `

  const iconNames = []
  const componentNames = []
  for (let name of fs.readdirSync(base).filter((el) => /\.svg$/.test(el))) {
    iconNames.push(name.split('.')[0].split('-').filter(isNaN).join('-'))
    const contents = fs.readFileSync(path.join(base, name), 'utf-8')
    const words = name.split('.')[0].split('-')
    const componentName =
      words
        .map((word) =>
          word.length < 2 ? word.toUpperCase() : word.charAt(0).toUpperCase() + word.slice(1)
        )
        .filter(isNaN)
        .join('') + 'Icon'
    componentNames.push(componentName)
    let result = await svgr(
      contents,
      {
        icon: true,
        typescript: true,
        titleProp: false,
        removeTitle: true,
        replaceAttrValues: {
          '#fff': '{props.color}',
          '#FFF': '{props.color}',
          '#333': '{props.color}',
          '#333333': '{props.color}',
        },
        dimensions: false,
      },
      { componentName }
    )
    result = result.replace('React.SVGProps<SVGSVGElement>', 'IconProps')
    result = result.replace('import * as React from "react";', '')
    result = result.replace(/export default .*;/g, '')
    result = result.replace(/<title>.*<\/title>/g, '')
    result = result.replace(/<desc>.*<\/desc>/g, '')

    fileContents += result
  }

  fileContents +=
    'export type IconName = ' + iconNames.map((name) => `"${name}"`).join(' | ') + ';\n\n'

  fileContents +=
    'export const iconNames: IconName[] = [' +
    iconNames.map((name) => `"${name}"`).join(', ') +
    '];\n\n'

  fileContents += `
export const IconSelect = ({ name, iconProps }: { name: IconName, iconProps: {[key: string]: any} }) => {
  switch (name) { ${iconNames
    .map(
      (name, i) => `
    case "${name}":
      return <${componentNames[i]} {...iconProps} color={iconProps.color || '#fff'}/>;`
    )
    .join('')}
  }
};
  `

  fileContents = fileContents.replace('\n\n\n', '\n')

  fs.writeFileSync('src/assets/icons/GeneratedIcons.tsx', fileContents)
}

script()
