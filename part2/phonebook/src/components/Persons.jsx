const Person = ({ name, number }) => {
    return <li>{name} {number}</li>
}

const Persons = ({ persons }) => {
    return (
        <div>
            <ul>
                {persons.map((person) => (
                    <Person key={person.name} name={person.name} number={person.number} />
                ))}
            </ul>
        </div>
    )
}

export default Persons