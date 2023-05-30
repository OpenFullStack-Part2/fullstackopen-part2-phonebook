

const Notification = ({ message, messageType }) => {
    const error = {
        color: `red`,
        background: `lightgrey`,
        fontSize: `20px`,
        borderStyle: `solid`,
        borderRadius: `5px`,
        padding: `10px`,
        
    }

    const success = {
        color: `green`,
        background: `lightgrey`,
        fontSize: `20px`,
        borderStyle: `solid`,
        borderRadius: `5px`,
        padding: `10px`,
        marginBottom: `10px`,
    }
    if (message === null) {
        return null
    }
   if (messageType === `success`) {
       return (
           <div style={success}>
               {message}
           </div>
       )
   }
   if (messageType === `error`) {
       return (
           <div style={error}>
               {message}
           </div>
       )
   }

 
}

export default Notification
