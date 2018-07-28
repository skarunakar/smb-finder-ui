import React from "react";
import app from "../sass/smb_finder.scss";
class Tabs extends React.Component {
    constructor(props) {
        super(props);
        this.searchResponse = this.props.searchResponse || [];
    }
    componentWillReceiveProps = (nextProps) => {
        this.searchResponse = nextProps.searchResponse;
    }
    render() {
        let searchResponse = this.searchResponse.map((trow,key) => {
            return (<div className="search-result-row" key={key}>
                <p><b>Company Name: </b>{trow.companyName ? <span>{trow.companyName}</span> : <span>Not Known</span> }</p>
                <p><b>Email: </b>{ trow.emailID ?  <span>{trow.emailID}</span> : <span>Not Known</span> } </p>
                <p><b>Age of Company: </b>{ trow.ageOfTheComapany ?  <span>{trow.ageOfTheComapany}</span> : <span>Not Known</span> } </p>
                <p><b>Started In: </b>{ trow.dateOfIncorporation ?  <span>{trow.dateOfIncorporation}</span> : <span>Not Known</span> } </p>
            </div>);
        });
        return (<div className="tab-container">
            <div className="mca-result">
                <div className="container-header"><p>Results from Zauba Corp</p></div>
                <div className="container-search-results">
                    {searchResponse}
                </div>
            </div>
        </div>);
    }
}
export default Tabs;