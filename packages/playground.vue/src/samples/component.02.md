
:: v-table-script

    import { useTable, useCollection } from '#app'

    const table = useTable()
    const colletion = useCollection('todos')

    const response = await collection.findAll()

    console.log('Meta', response.meta)
    
    table.setItems(response.data)
