import { Messages } from "/chat/Messages.js"


function easeOutBack(x) {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
}

function easeOutQuint(x) {
    return 1 - Math.pow(1 - x, 5);
}

// markup for rendering the chat component
export default function ChatComponent(config, state, prevState, updater, face){

    console.log('rerenderoing')
    const container = document.createElement('div')
    let cleanups = []

    let styles = {
        position: 'absolute',
        bottom: '24px',
        right: '24px',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-end'
    }
    
    Object.keys(styles).forEach(k => {
        container.style[k] = styles[k]
    })

    if (state.opened){
        //console.log("open")
        let chatWindow = ChatWindow(config, state, prevState, updater)
        let avatar = Face(config, state, prevState, face)

        container.appendChild(chatWindow.component)
        container.appendChild(avatar.component)
        container.appendChild(Opener(config, state, updater))

        cleanups.push(chatWindow.cleanup)
        cleanups.push(avatar.cleanup)

    } else {
        //console.log("closed")
        container.appendChild(Opener(config, state, updater))
    }

    return {component: container, cleanup: () => {
        for (let cleanup of cleanups){
            cleanup()
        }
    }}
}


const ChatWindow = (config, state, prevState, updater) => {
    let chatWindow = document.createElement('div')
    let cleanups = []

    let styles = {
        width: '100%',
        maxHeight: '100%',
        boxShadow: 'rgba(0, 0, 0, 0.15)',
        borderRadius: '12px',
        width: 'calc(100vw - 48px)',
        maxWidth: '400px',
        height: 'calc(100vh - 140px)',
        maxHeight: '600px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
        overflow: 'hidden',
        border: '0.5px solid rgba(201, 217, 232, 0.25)',
        backgroundColor: '#F1F5F9',
        boxShadow: '8px 8px 16px #C9D9E8, -6px -6px 10px #FFFFFF',
        borderRadius: '20px',
        opacity: !prevState.opened ? 0 : 1,
        transform: !prevState.opened ? 'scale(0)': 'scale(1)',
        transformOrigin: 'bottom right'
    }


    // trigger open window animation
    //console.log(!prevState.opened && state.opened)

    if (!prevState.opened && state.opened){
        setTimeout(() => {
            let opacity = 0
            let scale = 0
            let o = 0
            let s = 0


            let popOpen = () => {
                //console.log("opened fired")
                scale = easeOutBack(s)
                opacity = easeOutBack(o)
                s += 0.01
                o += 0.01

                chatWindow.style.opacity = opacity
                chatWindow.style.transform = `scale(${scale})`

                if(s < 1 || o < 1){
                    requestAnimationFrame(popOpen)
                }
            }

            popOpen()

        }, [100])
    } 

    // close window animation
    if(state.opened){
        let opacity = 0
        let scale = 0
        let o = 0
        let s = 0

        let popClosed = () => {
            scale = 1 - easeOutQuint(s)
            opacity = 1 - easeOutQuint(o)
            s += 0.01
            o += 0.01

            chatWindow.style.opacity = opacity
            chatWindow.style.transform = `scale(${scale})`
            

            if(s < 1 || o < 1){
                requestAnimationFrame(popClosed)
            } 
            else {
                //console.log("close window updater")
                //window.removeEventListener('closeChat', popClosed)
                updater((state) => {
                    return {
                        ...state,
                        messages: [...state.messages],
                        opened: !state.opened
                    }
                })
            }
        }

        cleanups.push(() => window.removeEventListener('closeChat', popClosed))

        window.addEventListener('closeChat', popClosed)
    }

    Object.keys(styles).forEach(k => {
        chatWindow.style[k] = styles[k]
    })

    chatWindow.appendChild(Header(config))
    let messages = Messages(state, prevState)
    cleanups.push(messages.cleanup)
    chatWindow.appendChild(messages.component)
    chatWindow.appendChild(Form(config, updater))
    
    return {component: chatWindow, cleanup : () => {
        for (let cleanup of cleanups){
            cleanup()
        }
    }}
}


const Header = (config) => {

    let styles = {
        position: 'relative',
        width: '100%',
        //flexGrow: 0.08,
        height: '10%',
        minHeight: '10%',
        maxHeight: '10%',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        fontWeight: 500,
        fontSize: '15px',
        paddingLeft: '24px',
        backgroundColor: 'rgba(201, 217, 232, 0.25)'
    }

    let headerDividerStyles = {
        position: 'absolute',
        zIndex: 2,
        bottom: 0,
        left: 0,
        width: '100%',
        height: '0.5px',
        maxHeight: '0.5px',
    }

    const header = document.createElement('div')
    const divider = document.createElement('div')

    const headerMain = document.createElement('p')
    headerMain.style.fontWeight = 500
    headerMain.style.fontSize = '14px'
    headerMain.style.lineHeight = '20px'

    const headerSub = document.createElement('p')
    headerSub.style.fontWeight = 400
    headerSub.style.fontSize = '12px'
    headerSub.style.lineHeight = '16px'

    headerMain.textContent = `${config.botName} - Chaos Coordinator`
    headerSub.textContent = `Typically responds sometimes`

    Object.keys(styles).forEach(k => {
        header.style[k] = styles[k]
    })

    Object.keys(headerDividerStyles).forEach(k => {
        divider.style[k] = headerDividerStyles[k]
    })

    header.append(divider)
    header.append(headerMain)
    header.append(headerSub)

    return header
}


const Opener = (config, state, updater) => {

    let close = document.createElement('button')

    let styles;

    if(state.opened){
        styles = {
            width: '56px',
            marginTop: '16px',
            position: 'relative',
            boxShadow: '8px 8px 16px #C9D9E8, -6px -6px 10px #FFFFFF',
            borderRadius: '20px',
            backgroundColor: '#F1F5F9',
            border: '0.5px solid rgba(201, 217, 232, 0.25)',
            cursor: 'pointer',
            padding: '8px'
        }
        close.innerText = 'Close'
    } else {

        styles = {
            width: '56px',
            marginTop: '16px',
            position: 'relative',
            boxShadow: '8px 8px 16px #C9D9E8, -6px -6px 10px #FFFFFF',
            borderRadius: '20px 20px 10px 20px',
            backgroundColor: '#FF2301',
            cursor: 'pointer',
            padding: '8px',
            color: 'white',
            border: 'none'
        }
        close.innerText = 'Chat'
        
    }


    let toggle = () => {
        close.removeEventListener('click', toggle)
        //console.log("TOGGLE STATE", state)
        if(state.opened){
            // updater fires in chatWindow after animate out
            window.dispatchEvent(new CustomEvent("closeChat"))
        } else {
            updater((state) => {
                return {
                    ...state,
                    messages: [...state.messages],
                    opened: !state.opened
                }
            })
        }
    }

    close.addEventListener('click', toggle)
    

    Object.keys(styles).forEach(k => {
        close.style[k] = styles[k]
    })

    return close
}


const Face = (config, state, prevState, face) => {
    let cleanups = []

    let wrapper = document.createElement('div')
    let image = face
    image.style.position = "absolute";
    image.style.top = "0";
    image.style.left = "0";
    image.style.width = "100%";
    image.style.height = "100%";
    image.style.minWidth = "100%";
    image.style.minHeight = "100%";
    image.style.zIndex = 1;
    image.style.borderRadius = '50%'
    image.style.objectFit = 'cover'
    image.style.transition = 'scale 1s ease-out'
    image.style.transitionDelay = '1s'

    wrapper.appendChild(image);

    let styles = {
        width: '96px',
        height: '96px',
        position: 'absolute',
        boxShadow: '8px 8px 16px #C9D9E8, -6px -6px 10px #FFFFFF',
        borderRadius: '50%',
        top: '24px',
        right: '20px',
        zIndex: 2,
        opacity: !prevState.opened ? 0 : 1,
        transform: !prevState.opened ? 'scale(0)': 'scale(1)',
        transformOrigin: 'bottom right'

    }

    Object.keys(styles).forEach(k => {
        wrapper.style[k] = styles[k]
    })

    // trigger open window animation
    if (!prevState.opened && state.opened){
        setTimeout(() => {
            let opacity = 0
            let scale = 0
            let o = 0
            let s = 0


            let popOpen = () => {
                scale = easeOutBack(s)
                opacity = easeOutBack(o)
                s += 0.01
                o += 0.01

                wrapper.style.opacity = opacity
                wrapper.style.transform = `scale(${scale})`

                if(s < 1 || o < 1){
                    requestAnimationFrame(popOpen)
                }
            }

            popOpen()

        }, [100])
    } 

    // close window animation
    if(state.opened){
        let opacity = 0
        let scale = 0
        let o = 0
        let s = 0

        let popClosed = () => {
            scale = 1 - easeOutQuint(s)
            opacity = 1 - easeOutQuint(o)
            s += 0.01
            o += 0.01

            wrapper.style.opacity = opacity
            wrapper.style.transform = `scale(${scale})`
            

            if(s < 1 || o < 1){
                requestAnimationFrame(popClosed)
            }
        }

        cleanups.push(() => window.removeEventListener('closeChat', popClosed))

        window.addEventListener('closeChat', popClosed)
    }

    // bot is talking if last messages were the bot
    if(state.messages[state.messages.length - 1] && !state.messages[state.messages.length - 1].isUserMessage){
        try {

            let scale = 0
            let s = 0
            let frame;
    
            let growFace = () => {
                scale = easeOutBack(s)
                s += 0.0025
                image.style.transform = `scale(${1 + scale})`
                if(s < 0.1){ frame = requestAnimationFrame(growFace) }
            }

            let shrinkFace = () => {
                console.log("shrink")
                scale = easeOutBack(s)
                s -= 0.005
                image.style.transform = `scale(${1 + scale})`
                if(s > 0){ frame = requestAnimationFrame(shrinkFace) }
            }

            image.addEventListener("ended", shrinkFace)
            growFace()

            image.play()
            cleanups.push(() => image.pause(), () => { cancelAnimationFrame(frame), () => image.removeEventListener("ended", shrinkFace) })
        } 
        catch(e){
            console.log("Error: avatar can't talk")
        }
    }

    return {component: wrapper, cleanup: () => {
        for (let cleanup of cleanups){
            cleanup()
        }
    }}
}


const Form = (config, updater) => {
    let chatForm = document.createElement('div')
    let chatDivider = document.createElement('div')
    let chatInput = document.createElement('input')
    let chatSend = document.createElement('button')
    let chatSendIcon = document.createElement('img')

    let chatFormStyles = {
        position: 'relative',
        width: '100%',
        flexGrow: 0.08,
        height: '9%',
        minHeight: '9%',
        maxHeight: '9%'
    }

    let chatDividerStyles = {
        position: 'absolute',
        zIndex: 2,
        top: 0,
        width: '100%',
        height: '0.5px',
        maxHeight: '0.5px',
        backgroundColor: 'rgba(201, 217, 232, 0.75)'
    }

    let chatInputStyles = {
        position: 'relative',
        width: '100%',
        backgroundColor: 'transparent',
        height: '100%',
        border: 'none',
        paddingLeft: '24px',
        paddingRight: '52px',
        boxSizing: 'border-box',
        color: 'black',
        fontSize: '15px',
        outline: 'none'
    }

    let chatSendStyles = {
        position: 'absolute',
        zIndex: 2,
        right: '20px',
        top: '50%',
        transform: 'translateY(-50%)',
        backgroundColor: 'transparent',
        height: '20px',
        border: 'none',
        cursor: 'pointer'
    }

    Object.keys(chatFormStyles).forEach(k => {
        chatForm.style[k] = chatFormStyles[k]
    })

    Object.keys(chatDividerStyles).forEach(k => {
        chatDivider.style[k] = chatDividerStyles[k]
    })

    Object.keys(chatInputStyles).forEach(k => {
        chatInput.style[k] = chatInputStyles[k]
    })

    Object.keys(chatSendStyles).forEach(k => {
        chatSend.style[k] = chatSendStyles[k]
    })

    chatSendIcon.src = '/chat/send.svg'
    chatSendIcon.style.height = '100%'

    chatInput.placeholder = 'Send a message...'

    chatSend.append(chatSendIcon)
    chatForm.append(chatDivider)
    chatForm.append(chatInput)
    chatForm.append(chatSend)

    let sendMessage = () => {
        if(chatInput.value.length > 0){
            console.log("sending message updater")

            // update with user message
            updater((state) => {
                return {
                    ...state,
                    messages: [...state.messages, { text: chatInput.value, isUserMessage: true }]
                }
            })

        }
    }

    let processInput = (e) => {
        if (e.key === 'Enter') {
            sendMessage()
        }
    }

    let focusInput = (e) => {
        chatInput.focus()
        window.addEventListener('updatedChatComp', focusInput);
    }

    chatSend.addEventListener("click", sendMessage)
    chatInput.addEventListener('keyup', processInput);
    window.addEventListener('updatedChatComp', focusInput);
        
    return chatForm
}