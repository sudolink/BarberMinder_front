import axios from "axios";
import {useState, useRef, useEffect} from "react";

const API_URL = import.meta.env.VITE_PROD_ENV == 'DEV' ? import.meta.env.VITE_BACKEND_URL_DEV : import.meta.env.VITE_BACKEND_URL_PROD;

export default function CustSearch(props){
    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);
    const timeoutId = useRef(null);

    function handleSubmit(e){
        e.preventDefault();
        console.log(search);
        // fetch(`http://localhost:3001/api/custSearch/${search}`)
        // .then(res => res.json())
        // .then(data => setResults(data))
    }


    function handleChange(event) {
        setSearch(event.target.value);
    }

    useEffect(() => {
        clearTimeout(timeoutId.current);
        // Debounce the API call for 200ms
        timeoutId.current = setTimeout(() => {
            // Call the API here
            if(search.length > 0){
                axios.get(`/api/v1/getCustomer/`, {params: {name: search}})
                .then(res => {
                    setResults(res.data);
                })
                .catch(err => {
                    setResults([]);
                    console.log(err.response)
                });
            }else{
                setResults([]);
            }
        }, 200);
    }, [search])

    return (
        <div className="custSearch">
            {/* <h2 style={{color:'orange', padding: '1rem'}}>no functionality or styling here yet, for now, at this moment in time, as we speak</h2> */}
            <form onSubmit={handleSubmit}>
                <input className="searchInput" type="text" placeholder="Find customer" onChange={handleChange}/>
                {/* <button type="submit">Search</button> */}
            </form>
            <div className="results">
                {results.map((result, i) => {
                    return <p key={i}>{result.name}</p>
                })}
            </div>
        </div>
    )
}