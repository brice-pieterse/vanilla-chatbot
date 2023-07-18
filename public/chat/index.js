import ChatComponent from "/chat/ChatComponent.js"

let root = document.body
let lastComponent = null

let config = {
    botName: 'Patrick',
    avatar: '/chat/avatar.mp4'
}


// TODO
// get state changes working for: new user messages, open and close, new bot message
// animations on state changes
// styling


// manages state changes and calling for re-render on state change
const stateManager = () => {

    let state = {
        messages: [
            { text: 'Hi there!', isUserMessage: false }, 
            { text: 'How can I help?', isUserMessage: false }, 
            // { text: 'I dunno', isUserMessage: true }
        ],
        opened: false
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

    let face = document.createElement('video')
    face.src = config.avatar
    face.load()

    let renderCallBack = (state, prevState, updater) => {
        if(lastComponent){ 
            lastComponent.cleanup()
            root.removeChild(lastComponent.component)
         }
        
        const chat = ChatComponent(config, state, prevState, updater, face)
        lastComponent = chat
        root.appendChild(chat.component)
        window.dispatchEvent(new CustomEvent('updatedChatComp'))
    }

    let checkForNewMessages = (state, prevState, updater) => {

        if(state.messages.length > prevState.messages.length){
            let newMessages = state.messages.slice(prevState.messages.length, state.messages.length)
            console.log("new messages: ", newMessages)

            for (let newMessage of newMessages){
            
                if(newMessage.isUserMessage){

                    // TEMP - FAKE BOT RESPONSE
                    setTimeout(() => {
                        updater((state) => {
                            return {
                                ...state,
                                messages: [...state.messages, { text: "Responding to the user", isUserMessage: false }]
                            }
                        })
                    }, 1500)

                }

            }

        
        }

    }
    
    // rerender on new messages or chatbot state updates
    registerListeners((newState, prevState, updater) => renderCallBack(newState, prevState, updater))

    // respond to user input
    registerListeners((newState, prevState, updater) => checkForNewMessages(newState, prevState, updater))


    updater((state) => {
        return {
            ...state,
            messages: [...state.messages]
        }
    })

}


init()