import ChatComponent from "/chat/ChatComponent.js"

let root = document.body
let lastComponent = null
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
        messages: [{ text: 'Hi there!', isUserMessage: false }, { text: 'How can I help?', isUserMessage: false }, { text: 'I dunno', isUserMessage: true }],
        opened: true
    }

    let prevState = {
        messages: [],
        opened: false
    }

    let listeners = []

    const updater = (updaterFunc) => {
        prevState = state
        state = updaterFunc(state)
        fireListeners()
    }

    const fireListeners = () => {
        listeners.forEach(listener => listener(state, prevState, updater))
    }

    const registerListeners = (listenerFunc) => {
        listeners.push(listenerFunc)
    }

    return [state, updater, registerListeners]

}


const init = () => {
    const [state, updater, registerListeners] = stateManager()

    let renderCallBack = (state, prevState, updater) => {
        if(lastComponent){ 
            root.removeChild(lastComponent.component)
            lastComponent.cleanup()
         }
        
        const chat = ChatComponent(config, state, prevState, updater)
        lastComponent = chat
        root.appendChild(chat.component)
        window.dispatchEvent(new CustomEvent('updatedChatComp'))
    }
    
    registerListeners((newState, prevState, updater) => renderCallBack(newState, prevState, updater))

    updater((state) => {
        return {
            ...state,
            messages: [...state.messages]
        }
    })

}


init()