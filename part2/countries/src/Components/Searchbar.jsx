const Searchbar = ({searchWord, handleSearchChange}) => {
    
    return (
        <>
            find countries <input value={searchWord} onChange={handleSearchChange}/>
        </>
    )
}

export default Searchbar

