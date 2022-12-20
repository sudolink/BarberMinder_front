import {useState, useEffect} from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_BACKEND_URL;
export default function Issues(props){
    const [issueList, setIssueList] = useState([]);
    const [issueListLoaded, setIssueListLoaded] = useState(false);
    const [issueListError, setIssueListError] = useState(false);
    const [newIssue, setNewIssue] = useState({
        title: "",
        description: "",
    });
    const [refreshIssues, setRefreshIssues] = useState(false);

    useEffect(() => {
        axios.get(`${API_URL}`+'/api/v1/allIssues')
        .then(res => {
            if(res.status == 200)
            {
                setIssueList(res.data);
                setIssueListLoaded(true);
            }
        })
        .catch(err => {
            console.log(err);
            setIssueListError(true);
            }
        );
    }, [refreshIssues]);

    function handleChange(event) {
        setNewIssue({...newIssue, [event.target.name]: event.target.value});
    }

    function handleClick(){
        console.log("submit issue");
        axios.post(`${API_URL}`+'/api/v1/newIssue',newIssue)
        .then(res => {
            console.log(res.data);
            if(res.status == 200)
            {
                setRefreshIssues(!refreshIssues);
            }
        })
        .catch(err => {
            console.log(err);
        });
    }

    function terminateIssue(issue){
        axios.delete(`${API_URL}`+'/api/v1/deleteIssue', {params: {issue_id: issue.issue_id}})
        .then(res => {
            console.log(res.data);
            if(res.status == 200)
            {
                setRefreshIssues(!refreshIssues);
            }
        })
        .catch(err => {
            console.log(err);
        });
    }

    return (
        <div className="issues">
            <div className="newIssue">
                <h3>Post New Issue</h3>
                <form className="newIssueForm">
                    <input className="issueTitle" type="text" name="title" placeholder="Title" onChange={handleChange}/>
                    <textarea className="issueText" name="description" placeholder="Description" onChange={handleChange}/>
                </form>
                <button className="issueSubmitBtn" onClick={()=>{handleClick()}}>Post</button>
            </div>
            <div className="issueList">
                <h2 className="issuesHeading">{`Issues (${issueList.length})`}</h2>
                {issueListLoaded && issueList.map((issue, index) => {
                    return (
                        <div className="issue" key={index}>
                            <h3>{issue.title}<button onClick={()=>{terminateIssue(issue)}} className="terminateIssueBtn">x</button></h3>
                            <p>{issue.body}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}