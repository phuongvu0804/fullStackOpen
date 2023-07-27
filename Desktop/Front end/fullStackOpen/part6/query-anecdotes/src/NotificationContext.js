import { useContext, createContext, useReducer, useEffect } from "react"

const notificationReducer = (state, action) => {
    switch (action.type) {
      case 'ADD':
        return action.payload
      case 'REMOVE':
        return ''
      default:
        return state
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = ({children}) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, '')

    useEffect(() => {
        const timeOutId = setTimeout(() => {
            notificationDispatch({type: 'REMOVE'})
        }, 5000) 

        return () => {
            clearTimeout(timeOutId)
        }
    }, [notification])


    return (
        <NotificationContext.Provider value={[notification, notificationDispatch]}>
            {children}
        </NotificationContext.Provider>
    )
}

export const useNotificationValue = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[1]
}

export default NotificationContext