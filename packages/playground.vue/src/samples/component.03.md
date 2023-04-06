## Component with script

:: v-table-script
    #color="#fff"
    #no-footer

    import { useTable, useScript } from '#app'

    const table = useTable()
    const doneTodoScript = useScript('done-todos.ts')

    const response = await doneTodoScript.execute()
    
    table.setItems(response.data)
