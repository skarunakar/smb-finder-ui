import React from "react";
import app from "../sass/smb_finder.scss";
import Spinner from "./Spinner.jsx";
import State from "./State.json";
class Tabs extends React.Component {
    constructor(props) {
        super(props);
        this.mcaResponse = this.props.mcaResponse || [];
        this.fbResponse = this.props.fbResponse || [];
        this.justDialResponse = this.props.justDialResponse || [];
    }
    componentWillReceiveProps = (nextProps) => {
        this.mcaResponse = nextProps.mcaResponse;
        this.fbResponse = nextProps.fbResponse ;
        this.justDialResponse = nextProps.justDialResponse ;
    }
    render() {
        let mca = this.mcaResponse.map((trow,key) => {
            return (<div className="search-result-row" key={key}>
                <p><b>Company Name: </b>{trow.companyName ? <span>{trow.companyName}</span> : <span>Not Known</span> }</p>
                <p><b>Company Type: </b>{ trow.companyType ?  <span>{trow.companyType}</span> : <span>Not Known</span> } </p>
                <p><b>CIN Number: </b>{ trow.companyType ?  <span>{trow.cinNumber}</span> : <span>Not Known</span> } </p>
                <p><b>Listed/Not Listed: </b>{trow.listedValue? <span>{trow.listedValue}</span> : <span>Not Known</span>}</p>
                <p><b>Address: </b>{trow.address ? <span>{trow.address}</span> : <span>Not Known</span> }</p>
                <p><b>State: </b>{trow.state ? <span>{State[trow.state]}</span> : <span>Not Known</span>}</p>
                <p><b>Started In: </b>{trow.year ? <span>{trow.year}</span> : <span>Not Known</span>}</p>
            </div>);
        });
        let fb = this.fbResponse.map((trow,key) => {
           return(<div className="search-result-row" key={key}>
                <p><b>Company Name: </b>{trow.companyName ? <span>{trow.companyName}</span> : <span>Not Known</span> }</p>
                <p><b>Company Type: </b>{trow.category ? <span>{trow.category}</span> : <span>Not Known</span> }</p>
                <p><b>Phone Number: </b>{trow.phoneNumber ? <span>{trow.phoneNumber}</span> : <span>Not Known</span> }</p>
                <p><b>Website: </b>{trow.website ? <span>{trow.website}</span> : <span>Not Known</span> }</p>
            </div>);
        });
        let justdial = this.justDialResponse.map((trow,key) => {
            return(<div className="search-result-row" key={key}>
                <p><b>Company Type: </b>{trow.category ? <span>{trow.category}</span> : <span>Not Known</span> }</p>
            </div>);
        });
        return (<div className="tab-container">
            <div className="mca-result">
               <div className="container-header"><p>MCA</p></div>
                <div className="container-search-results">
                    {mca}
                </div>
            </div>
            <div className="fb-result">
               <div className="container-header"><p>FaceBook</p></div>
               <div className="container-search-results">
                   {fb}
               </div>
            </div>
            <div className="justdial-result">
                <div className="container-header"><p>JustDial</p></div>
                <div className="container-search-results">
                    {justdial}
                </div>
            </div>
        </div>);
    }
}
export default Tabs;