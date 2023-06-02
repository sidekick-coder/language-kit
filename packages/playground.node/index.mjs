async function run() {
    const files = ['lexer.mjs', 'markdown.mjs', 'core.mjs']

    for await (const file of files) {
        console.log(`-------------------- ${file} --------------------`)

        await import(`./${file}`)
    }
}

run()
