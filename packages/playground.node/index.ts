async function run() {
    const files = ['markdown.ts']

    for await (const file of files) {
        console.log(`-------------------- ${file} --------------------`)

        await import(`./${file}`)
    }
}

run()
