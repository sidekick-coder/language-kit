import { readFile } from 'fs/promises'
import { resolve } from 'path'
import { exec } from 'child_process'
import { promisify } from 'util'
import { logger } from '@poppinss/cliui'

import prompts from 'prompts'

const execAsync = promisify(exec)

const BASE_PATH = resolve(__dirname, '..')

async function findPackageJson(packageName: string) {
    const packagePath = resolve(BASE_PATH, 'packages', packageName, 'package.json')

    const text = await readFile(packagePath, 'utf-8')

    const json = JSON.parse(text)

    return json
}

async function run() {
    const options = await prompts([
        {
            name: 'package',
            type: 'select',
            message: 'Select package',
            choices: [
                { title: 'Lexer', value: 'lexer' },
                { title: 'Core', value: 'core' },
                { title: 'Markdown', value: 'markdown' },
            ],
        },
        {
            name: 'version',
            type: 'select',
            message: 'Select version',
            choices: [
                { title: 'Patch', value: 'patch' },
                { title: 'Minor', value: 'minor' },
                { title: 'Major', value: 'major' },
            ],
        },
    ])

    logger.info('Generating version', 'npm')

    const packagePath = resolve(BASE_PATH, 'packages', options.package)

    await execAsync(`npm version ${options.version} --no-git-tag-version`, {
        cwd: packagePath,
    })

    const json = await findPackageJson(options.package)

    logger.info(json.version, 'npm')

    const message = `feat: v${json.version}`

    logger.info('Creating commit', 'git')

    await execAsync(`git add ${resolve(packagePath, 'package.json')}`)
    await execAsync(`git commit -m "feat: v${options.package}"`)

    logger.info(message, 'git')
}

run().catch((e) => {
    console.error(e)

    process.exit(1)
})
