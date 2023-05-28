:: setup
    function message(msg = "Hello"){
        alert('Message ' + msg)
    }
::

:: button
    #label=Message
    @click=message
::

:: button
    #label=Message
    @click=message("custom message")
::
