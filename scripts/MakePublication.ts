import { readFile } from 'fs/promises'
import { resolve } from 'path'
import { exec } from 'child_process'
import { tasks } from '@poppinss/cliui'
import prompts from 'prompts'

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
            name: 'packages',
            type: 'multiselect',
            message: 'Select package',
            choices: [
                { title: 'Lexer', value: 'lexer' },
                { title: 'Core', value: 'core' },
                { title: 'Markdown', value: 'markdown' },
            ],
        },
    ])

    const runtime = tasks.verbose()

    options.packages.forEach((name: string) => {
        runtime.add(name, async (logger, task) => {
            const packagePath = resolve(BASE_PATH, 'packages', name)

            const json = await findPackageJson(name)

            logger.info(`Publishing ${json.name}@${json.version}`)

            const command = exec(`npm publish`, {
                cwd: packagePath,
            })

            command.stdout?.on('data', (data) => {
                data.toString()
                    .split('\n')
                    .forEach((line: string) => logger.info(line))
            })

            command.stderr?.on('data', (data) => {
                data.toString()
                    .split('\n')
                    .forEach((line: string) => logger.info(line))
            })

            command.on('error', (error) => task.fail(error))

            command.on('close', (code) => {
                if (code !== 0) return task.fail('Failed to publish')

                task.complete('Published')
            })
        })
    })

    await runtime.run()
}

run().catch((e) => {
    console.error(e)

    process.exit(1)
})
