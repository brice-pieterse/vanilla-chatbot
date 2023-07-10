

export const Messages = (state) => {
    let chatMessages = document.createElement('div')
    let cleanups = []

    let styles = {
        position: 'relative',
        width: '100%',
        flexGrow: 0.84,
        maxHeight: '84%',
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
            chatMessages.appendChild(createBotMessage(state, message).component)
        }
    }

    // last message was a user message, add bot typing bubble
    if(state.messages[state.messages.length - 1].isUserMessage){
        let m = createBotMessage()
        chatMessages.appendChild(m.component)
        cleanups.push(m.cleanup)
    }


    let updateScroll = () => {
        chatMessages.scrollTop = chatMessages.scrollHeight;
        window.removeEventListener('updatedChatComp', updateScroll)
    }

    window.addEventListener('updatedChatComp', updateScroll)

    return {
        component: chatMessages,
        cleanup: () => {
            for (let cleanup of cleanups){
                cleanup()
            }
        }
    }
}

const createUserMessage = (message) => {
    let userMessageWrapper = document.createElement('div')
    let userMessage = document.createElement('div')
    let userMessageTail = document.createElement('div')
    let userMessageTailShaper = document.createElement('div')

    let tailShaperStyles = {
        position: 'absolute',
        bottom: '-8px',
        right: '-4px',
        borderRadius: '0px 0px 0px 100%',
        backgroundColor: '#F1F5F9',
        width: '16px',
        height: '16px',
        zIndex: 1
    }

    let tailStyles = {
        position: 'absolute',
        bottom: '-8px',
        borderRadius: '0px 0px 0px 100% ',
        backgroundColor: 'rgba(255, 31, 5, 1)',
        width: '16px',
        height: '16px',
        transform: 'rotate(-40deg)'
    }

    let messageStyles = {
        position: 'relative',
        padding: '10px',
        borderRadius: '20px',
        backgroundColor: 'rgba(255, 31, 5, 1)',
        color: 'white',
        fontSize: '15px',
        wordWrap: 'break-word',
        zIndex: 2
    }

    let wrapperStyles = {
        position: 'relative',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: '16px'
    }

    Object.keys(messageStyles).forEach(k => {
        userMessage.style[k] = messageStyles[k]
    })

    Object.keys(wrapperStyles).forEach(k => {
        userMessageWrapper.style[k] = wrapperStyles[k]
    })

    Object.keys(tailStyles).forEach(k => {
        userMessageTail.style[k] = tailStyles[k]
    })

    Object.keys(tailShaperStyles).forEach(k => {
        userMessageTailShaper.style[k] = tailShaperStyles[k]
    })

    userMessage.innerText = message.text
    userMessageWrapper.append(userMessageTailShaper)
    userMessageWrapper.append(userMessageTail)
    userMessageWrapper.append(userMessage)

    return userMessageWrapper

}

const createBotMessage = (message = null) => {
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
        zIndex: 2,
        width: !message && '40px' || 'auto',
        height: !message && '36px' || 'auto'
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

    botMessage.innerText = message ? message.text : ''
    botMessageWrapper.append(botMessageTailShaper)
    botMessageWrapper.append(botMessageTail)
    botMessageWrapper.append(botMessage)

    // awaiting bot message and this is the typing bubble
    if (!message){
        let typing = setInterval(() => {
            if(botMessage.innerText.length < 4){
                botMessage.innerText += '.'
            } else botMessage.innerText = ''
        }, 250)

        return {
            component: botMessageWrapper, 
            cleanup: () => {
                clearInterval(typing)
            }
        }
    }

    return {
        component: botMessageWrapper, 
        cleanup: () => {}
    }

    

}