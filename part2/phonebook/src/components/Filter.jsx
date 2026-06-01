const Filter = ({ filterValue, filterHandle }) => {
    return (
        <div>
            Filter shown with: <input value={filterValue} onChange={filterHandle} />
        </div>
    )
}

export default Filter