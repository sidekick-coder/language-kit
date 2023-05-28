:: setup
    import { ref } from 'vue'

    const a = ref(0)
    const b = ref(1)

    const sum = computed(() => a + b)

    function increment(){
        a.value++
        b.value++
    }
::

### Data

Sum: {{ sum }}
A: {{ a }}
B: {{ b }}

:: script-btn
    #label="Update"
    
    import { useBtn, usePage } from '#app'

    const btn = useBtn()
    const page = usePage()

    btn.onClick(() => page.increment())
::
