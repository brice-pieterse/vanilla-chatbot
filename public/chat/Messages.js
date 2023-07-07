export const Messages = (state) => {
    let chatMessages = document.createElement('div')

    let styles = {
        position: 'relative',
        width: '100%',
        flexGrow: 0.84,
        padding: '16px',
        overflow: 'scroll'
    }

    Object.keys(styles).forEach(k => {
        chatMessages.style[k] = styles[k]
    })

    for (let message of state.messages){
        if (message.isUserMessage){
            chatMessages.appendChild(createUserMessage(message))
        } else {
            chatMessages.appendChild(createBotMessage(message))
        }
    }

    
    return chatMessages
}

const createUserMessage = (message) => {
    let userMessage = document.createElement('div')

    let styles = {
        position: 'relative',
        width: '100%',
        padding: '4px',
        backgroundColor: 'blue'
    }

    Object.keys(styles).forEach(k => {
        userMessage.style[k] = styles[k]
    })

    return userMessage
}

const createBotMessage = (message) => {
    let botMessageWrapper = document.createElement('div')
    let botMessage = document.createElement('div')
    let botMessageTail = document.createElement('div')
    let botMessageTailShaper = document.createElement('div')

    let tailShaperStyles = {
        position: 'absolute',
        bottom: '-8px',
        left: '-4px',
        borderRadius: '0px 0px 100% 0px',
        backgroundColor: '#F1F5F9',
        width: '16px',
        height: '16px',
        zIndex: 1
    }

    let tailStyles = {
        position: 'absolute',
        bottom: '-8px',
        borderRadius: '0px 0px 100% 0px',
        backgroundColor: 'rgba(201, 217, 232)',
        width: '16px',
        height: '16px',
        transform: 'rotate(40deg)'
    }

    let messageStyles = {
        position: 'relative',
        padding: '10px',
        borderRadius: '20px',
        backgroundColor: 'rgba(201, 217, 232)',
        color: 'black',
        fontSize: '15px',
        wordWrap: 'break-word',
        zIndex: 2
    }

    let wrapperStyles = {
        position: 'relative',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: '16px'
    }

    Object.keys(messageStyles).forEach(k => {
        botMessage.style[k] = messageStyles[k]
    })

    Object.keys(wrapperStyles).forEach(k => {
        botMessageWrapper.style[k] = wrapperStyles[k]
    })

    Object.keys(tailStyles).forEach(k => {
        botMessageTail.style[k] = tailStyles[k]
    })

    Object.keys(tailShaperStyles).forEach(k => {
        botMessageTailShaper.style[k] = tailShaperStyles[k]
    })

    botMessage.innerText = message.text
    botMessageWrapper.append(botMessageTailShaper)
    botMessageWrapper.append(botMessageTail)
    botMessageWrapper.append(botMessage)

    return botMessageWrapper
}