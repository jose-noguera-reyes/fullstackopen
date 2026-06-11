const Filter = ({ filterValue, filterHandle }) => {
    return (
        <div>
            Find countries: <input value={filterValue} onChange={filterHandle} />
        </div>
    )
}

export default Filter