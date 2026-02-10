const Notification = ({ message, type }) => {
    if (message === null) {
        return null
    }

    // type can be 'success' or 'error'
    // The CSS classes are .success and .error respectively
    return (
        <div className={type}>
            {message}
        </div>
    )
}

export default Notification
