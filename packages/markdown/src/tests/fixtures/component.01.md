:: script-block
    import { useBlock } from '#app'

    const block = useBlock()

    const sum = (a , b) => a + b

    console.log('begin sum')

    const result = sum(5, 10)

    block.setText(result)

    console.log('end sum')
