import axios from "axios";
import {useState, useRef, useEffect} from "react";

export default function CustSearch(props){
    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);
    const timeoutId = useRef(null);

    function handleSubmit(e){
        e.preventDefault();
        console.log(search);
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
                axios.get(`/api/v1/getCustomerLike/`, {params: {name: search}})
                .then(res => {
                    if(res.data.length > 5){
                        setResults(res.data.slice(0, 5))
                    }else{
                        setResults(res.data);
                    }
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

    function pickCustomer(customer){
        setSearch("");
        props.setCustomer(customer);
        setResults([]);
    }

    return (
        <div className="custSearch">
            {/* <h2 style={{color:'orange', padding: '1rem'}}>no functionality or styling here yet, for now, at this moment in time, as we speak</h2> */}
            <form onSubmit={handleSubmit}>
                <input className="searchInput" type="text" placeholder="...start typing..." value={search} onChange={handleChange}/>
            </form>
            <div className="results">
                {
                results.length > 0 ?
                results.map((result, i) => {
                    let name = result.name;
                    let regex = new RegExp(search, "gi");
                    //highlight the search term in the results list
                    let highlightedName = name.replace(regex, (match) => {
                        return `<span class="searchHighlight">${match}</span>`;
                    });
                    //onClick={() => props.setCustomer(result)
                    return (
                        <div key={i} className="result">
                            <button className="resultButtons" onClick={() => pickCustomer(result)}>
                                <p className="customerName" dangerouslySetInnerHTML={{__html: highlightedName}}></p>
                            </button>
                        </div>
                    )
                }) 
                :
                <div className={`${"noResults"}`}>
                    {props.customer == null && search != "" && "0 results"}
                </div>
                }
            </div>
        </div>
    )
}