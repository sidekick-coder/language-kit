console.log('Hello from the playground.node package')

async function run() {
    const files = ['lexer.ts', 'core.ts']

    for await (const file of files) {
        console.log(`-------------------- ${file} --------------------`)

        await import(`./${file}`)
    }
}

run()
