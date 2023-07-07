import ChatComponent from "/chat/ChatComponent.js"

let root = document.body
let component = null
let config = {
    botName: 'Patrick',
    avatar: '/chat/avatar.png'
}


// TODO
// get state changes working for: new user messages, open and close, new bot message
// animations on state changes
// styling


// manages state changes and calling for re-render on state change
const stateManager = () => {

    let state = {
        messages: [{ text: 'Hi there!', isUserMessage: false }, { text: 'How can I help?', isUserMessage: false }],
        opened: false
    }

    let listeners = []

    const updater = (updaterFunc) => {
        state = updaterFunc(state)
        fireListeners()
    }

    const fireListeners = () => {
        listeners.forEach(listener => listener(state))
    }

    const registerListeners = (listenerFunc) => {
        listeners.push(listenerFunc)
    }

    return [state, updater, registerListeners]

}


const init = () => {
    const [state, updater, registerListeners] = stateManager()

    let renderCallBack = (state) => {
        console.log(state)
        if(component){ root.removeChild(child) }
        const chat = ChatComponent(config, state)
        component = chat
        root.appendChild(chat)
    }
    
    registerListeners((newState) => renderCallBack(newState))

    updater((state) => {
        return {
            ...state,
            messages: [...state.messages]
        }
    })

}


init()