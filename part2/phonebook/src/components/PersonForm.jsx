const PersonForm = ({ submitForm, nameValue, nameHandle, numberValue, numberHandle }) => {
    return (
        <form onSubmit={submitForm}>
            <div>
                Name: <input value={nameValue} onChange={nameHandle}/>
            </div>
            <div>
                Number: <input value={numberValue} onChange={numberHandle}/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm