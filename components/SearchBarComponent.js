import React, {useState} from 'react'; //useState hook takes initial state value and returns an updated state value

//called whenever the user submits a search, onSearch is from search.js
export default function SearchBar({onSearch}) {
    
    const [query, setQuery] = useState(''); //query holds the current search query input field
    
    const handleInputChange = (e) => { //updates query state
        setQuery(e.target.value);
    };

    const handleSearch = () => {  // Calls the search function and passes the query to search.js
        onSearch(query);
    };
    
    return (
        <div>
            <input
                type="text"
                placeholder="Search Here"
                value={query} //display current search query
                onChange={handleInputChange} //updates query state
            />
            <button onClick={handleSearch}>Search</button>
        </div>
  );
}

    