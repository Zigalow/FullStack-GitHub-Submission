const Notification = ({message, type}) => {
    if (message === null) {
        return null
    }

    const className = !type.includes("success")
        ? "error"
        : "notification"

    return (
        <div className={className}>
            {message}
        </div>
    )

}

export default Notification