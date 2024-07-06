const Notification = ({message, type}) => {
    if (message === null) {
        return null
    }

    console.log("type", type)
    
    const className = !type.includes("success")
        ? "error"
        : "notification"

    console.log("className", className)
    
    return (
        <div className={className}>
            {message}
        </div>
    )

}

export default Notification