:: setup
    import { ref } from "vue"

    const count = ref(0)

    function increment(){
        count.value++
    }

    function decrement(){
        count.value--
    }


## Count {{ count }}

:: button
    :label=`Increment ${count}`
    #color=green
    @click=increment


:: button
    :label=`Decrement ${count}`
    #color=red
    @click=decrement

