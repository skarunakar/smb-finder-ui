import React from "react";
import { Link } from "react-router-dom";
class SMBFinder extends React.Component {
    render() {
        return (<div className="app-home">
            <div className="navbar-header"/>
            <h2>SBM Finder</h2>
            <div className="search-types">
                <p>Search By</p>
                <div className="search-by-container">
                    <div className="result-header"><Link to="/companyname">Company Name</Link></div>
                    <div className="result-header"><Link to="/uo1keyword">Uo1 Keyword</Link></div>
                </div>
            </div>
        </div>);
    }
}
export default SMBFinder;
