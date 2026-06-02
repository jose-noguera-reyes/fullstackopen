const Person = ({ name, number, id, deleteHandle }) => {
    return (
        <li>
            {name} {number}
            <button onClick={() => {deleteHandle(id)}}>Delete</button>
        </li>
    )
}

const Persons = ({ persons, deleteHandle }) => {
    return (
        <div>
            <ul>
                {persons.map((person) => (
                    <Person key={person.id} name={person.name} number={person.number} id={person.id} deleteHandle={deleteHandle} />
                ))}
            </ul>
        </div>
    )
}

export default Persons