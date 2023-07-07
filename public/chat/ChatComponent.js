import { Messages } from "/chat/Messages.js"

// markup for rendering the chat component
export default function ChatComponent(config, state){

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

    const container = document.createElement('div')
    
    Object.keys(styles).forEach(k => {
        container.style[k] = styles[k]
    })

    if (state.opened){
        container.appendChild(ChatWindow(config, state))
        container.appendChild(Face(config))
        container.appendChild(Opener(config, state))
    } else {
        container.appendChild(Opener(config, state))
    }

    return container
}


const ChatWindow = (config, state) => {
    let chatWindow = document.createElement('div')

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
        borderRadius: '20px'
    }

    Object.keys(styles).forEach(k => {
        chatWindow.style[k] = styles[k]
    })

    chatWindow.appendChild(Header(config))
    chatWindow.appendChild(Messages(state))
    chatWindow.appendChild(Form(config))
    
    return chatWindow
}


const Header = (config) => {

    let styles = {
        position: 'relative',
        width: '100%',
        flexGrow: 0.08,
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
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

    header.textContent = `Conversation with ${config.botName}`

    Object.keys(styles).forEach(k => {
        header.style[k] = styles[k]
    })

    Object.keys(headerDividerStyles).forEach(k => {
        divider.style[k] = headerDividerStyles[k]
    })

    header.append(divider)

    return header
}


const Opener = (config, state) => {

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
    

    Object.keys(styles).forEach(k => {
        close.style[k] = styles[k]
    })

    return close
}


const Face = (config) => {
    let face = document.createElement('div')
    let image = document.createElement('img')
    image.style.position = "absolute";
    image.style.top = "0";
    image.style.left = "0";
    image.style.width = "100%";
    image.style.height = "100%";
    image.style.zIndex = 1;
    image.style.borderRadius = '50%'

    face.appendChild(image);

    let styles = {
        width: '72px',
        height: '72px',
        position: 'absolute',
        boxShadow: '8px 8px 16px #C9D9E8, -6px -6px 10px #FFFFFF',
        borderRadius: '50%',
        top: '24px',
        right: '20px',
        zIndex: 2
    }

    Object.keys(styles).forEach(k => {
        face.style[k] = styles[k]
    })

    image.src = config.avatar

    return face
}


const Form = () => {
    let chatForm = document.createElement('div')
    let chatDivider = document.createElement('div')
    let chatInput = document.createElement('input')
    let chatSend = document.createElement('button')
    let chatSendIcon = document.createElement('img')

    let chatFormStyles = {
        position: 'relative',
        width: '100%',
        flexGrow: 0.08,
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
    
    return chatForm
}