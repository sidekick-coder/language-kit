console.log('Hello from the playground.node package')


async function run() {

    const files = ['lexer.mjs', 'markdown.mjs']

    for await (const file of files) {
        console.log(`-------------------- ${file} --------------------`)
        
        await import(`./${file}`)
    }

}

run()