import { readFile } from 'fs/promises'
import { resolve } from 'path'
import { exec } from 'child_process'
import { promisify } from 'util'
import { tasks } from '@poppinss/cliui'

import upperFirst from 'lodash/upperFirst'

import prompts from 'prompts'
import { Command } from './Command'
import { Logger } from '@poppinss/cliui/build/src/Logger'

const BASE_PATH = resolve(__dirname, '..')

const packages = [
    {
        name: 'lexer',
        fullName: '@language-kit/lexer',
        dependencies: [],
        path: resolve(BASE_PATH, 'packages', 'lexer'),
    },
    {
        name: 'core',
        fullName: '@language-kit/core',
        dependencies: ['@language-kit/lexer'],
        path: resolve(BASE_PATH, 'packages', 'core'),
    },
    {
        name: 'markdown',
        fullName: '@language-kit/markdown',
        dependencies: ['@language-kit/lexer', '@language-kit/core'],
        path: resolve(BASE_PATH, 'packages', 'markdown'),
    },
]

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
            message: 'Select packages',
            choices: packages.map(({ name }) => ({ title: name, value: name })),
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
        {
            name: 'updateDependencies',
            type: 'confirm',
            message: 'Update  dependencies?',
            initial: false,
        },
        {
            name: 'commitChanges',
            type: 'confirm',
            message: 'Commit changes?',
            initial: false,
        },
        {
            name: 'publishVersion',
            type: 'confirm',
            message: 'Publish version?',
            initial: false,
        },
    ])

    const runtime = tasks.verbose()

    const selectedPackages = packages.filter(({ name }) => options.packages.includes(name))

    const subLogs = (logger: Logger, data: string, prefix?: string) => {
        data.split('\n').forEach((l: string) => logger.info(l, prefix))
    }

    if (options.updateDependencies) {
        runtime.add('Update dependencies', async (logger, task) => {
            for await (const entry of selectedPackages) {
                logger.log(upperFirst(entry.name))

                if (!entry.dependencies.length) {
                    logger.warning('No dependencies to update')
                    continue
                }

                const value = `npm -w ${entry.fullName} install ${entry.dependencies.join(' ')}`

                logger.info(value, 'npm')

                // 5 minutes
                const timeout = 1000 * 60 * 5

                await new Command(value, { cwd: BASE_PATH }, timeout)
                    .onStdout((data) => subLogs(logger, data, 'npm'))
                    .onStderr((data) => subLogs(logger, data, 'npm'))
                    .onEnd()

                logger.success('Dependencies updated')
            }

            await task.complete()
        })
    }

    runtime.add('Update versions', async (logger, task) => {
        for await (const entry of selectedPackages) {
            logger.log(upperFirst(entry.name))

            const value = `npm -w ${entry.fullName} version ${options.version} --no-git-tag-version`

            logger.info(value, 'npm')

            // 5 minutes
            const timeout = 1000 * 60 * 5

            await new Command(value, { cwd: BASE_PATH }, timeout)
                .onStdout((data) => subLogs(logger, data, 'npm'))
                .onStderr((data) => subLogs(logger, data, 'npm'))
                .onEnd()

            logger.success('Version updated')
        }

        await task.complete()
    })

    if (options.commitChanges) {
        runtime.add('Commit changes', async (logger, task) => {
            for await (const entry of selectedPackages) {
                logger.log(upperFirst(entry.name))

                // 5 minutes
                const timeout = 1000 * 60 * 5

                const filename = resolve(entry.path, 'package.json')

                const json = await findPackageJson(entry.name)

                const commands = [
                    `git add ${filename}`,
                    `git commit -m "feat(${entry.name}): v${json.version}"`,
                ]

                for await (const command of commands) {
                    logger.info(command, 'git')

                    await new Command(command, { cwd: BASE_PATH }, timeout)
                        .onStdout((data) => subLogs(logger, data, 'git'))
                        .onStderr((data) => subLogs(logger, data, 'git'))
                        .onEnd()
                }

                logger.success('Commit created')
            }

            await task.complete()
        })
    }

    if (options.publishVersion) {
        runtime.add('Commit changes', async (logger, task) => {
            for await (const entry of selectedPackages) {
                logger.log(upperFirst(entry.name))

                // 5 minutes
                const timeout = 1000 * 60 * 5

                const value = `npm -w ${entry.fullName} publish`

                logger.info(value, 'npm')

                await new Command(value, { cwd: BASE_PATH }, timeout)
                    .onStdout((data) => subLogs(logger, data, 'npm'))
                    .onStderr((data) => subLogs(logger, data, 'npm'))
                    .onEnd()

                logger.success('Commit created')
            }

            await task.complete()
        })
    }

    // Object.entries(packages)
    //     .filter(([name]) => options.packages.includes(name))
    //     .forEach(([name, { dependencies }]) => {
    //         runtime.add(name, async (logger, task) => {
    //             const packagePath = resolve(BASE_PATH, 'packages', name)

    //             const log = (data: string, prefix?: string) => {
    //                 data.split('\n').forEach((l: string) => logger.info(l, prefix))
    //             }

    //

    //             await new Command(`npm version ${options.version} --no-git-tag-version`, {
    //                 cwd: packagePath,
    //             })
    //                 .onStdout(log)
    //                 .onStderr(log)
    //                 .onEnd()

    //             if (options.commitChanges) {
    //                 const json = await findPackageJson(name)
    //                 logger.info(json.version, 'npm')

    //                 const message = `feat: v${json.version}`

    //                 logger.info('Creating commit', 'git')

    //                 await new Command(`git add ${resolve(packagePath, 'package.json')}`).onEnd()

    //                 await new Command(`git commit -m "${message}"`).onEnd()

    //                 logger.info(message, 'git')
    //             }

    //             if (options.publishVersion) {
    //                 // publish
    //             }

    //             task.complete()
    //         })
    //     })

    await runtime.run()
}

run().catch((e) => {
    console.error(e)

    process.exit(1)
})
