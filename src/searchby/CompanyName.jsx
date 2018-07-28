import React from "react";
import superagent from "superagent";
import Tabs from "../components/Tabs.jsx";
import Spinner from "../components/Spinner.jsx";
import app from "../sass/smb_finder.scss"
class CompanyName extends React.Component {
    constructor(props) {
        super(props);
        this.companyName = "";
        this.state = {
            mcaResponse: [],
            fbResponse: [],
            justDialResponse: [],
            isDataLoaded: false,
            isDataLoading: false
        }
    }
    handleCompanyName = (e) => {
        if(e.keyCode === 13) {
            this.handleSubmit();
        }
        this.companyName = e.target.value;
    }
    handleSubmit = () => {
        if (!this.companyName.trim()) {
            return;
        }
        let mcaUrl = "https://infinite-falls-73031.herokuapp.com/smbfinder/mca/" + this.companyName;
        superagent
            .get(mcaUrl)
            .end((err, res) => {
                if (res && res.text && res.statusCode === 200 &&JSON.parse(res.text).length!=0) {
                    this.setState({mcaResponse: JSON.parse(res.text)});
                } else {
                    this.setState({mcaResponse: [{notFound: "No Result Found"}]});
                }
                this.setState({isDataLoading: false, isDataLoaded: true});
            });
        let fbUrl = "https://infinite-falls-73031.herokuapp.com/smbfinder/fb/" + this.companyName;
        superagent
            .get(fbUrl)
            .set({})
            .end((err, res) => {
                if (res && res.text && res.statusCode === 200 && JSON.parse(res.text).length!=0) {
                    this.setState({fbResponse: JSON.parse(res.text)});
                } else {
                    this.setState({fbResponse: [{notFound: "No Result Found"}]});
                }
                this.setState({isDataLoading: false, isDataLoaded: true});
            });
        let justDialUrl = "https://infinite-falls-73031.herokuapp.com/smbfinder/justdial/" + this.companyName;
        superagent
            .get(justDialUrl)
            .set({})
            .end((err, res) => {
                if (res && res.text && res.statusCode === 200 && JSON.parse(res.text).length!=0) {
                    this.setState({justDialResponse: JSON.parse(res.text)});
                } else {
                    this.setState({justDialResponse: [{notFound: "No Result Found"}]});
                }
                this.setState({isDataLoading: false, isDataLoaded: true});
            });
        this.setState({mcaResponse: [], fbResponse: [],justDialResponse: [], isDataLoading: true, isDataLoaded:false});
    }
    render() {
        return(<div className="company-home">
            <div className="navbar-header"/>
            <h2>SBM Finder</h2>
            <div className="container-input">
                <p>Enter Company Name </p>
                <input onKeyUp={this.handleCompanyName}/>
            </div>
            <div className="buttons">
                <button className="go" onClick={this.handleSubmit}>GO</button>
            </div>    
            {this.state.isDataLoading ? <Spinner/> : null}
            {this.state.isDataLoaded ?
                <div className="container-result">
                    <p className="query-header"><b>You Queried for:</b></p>
                    <Tabs mcaResponse={this.state.mcaResponse} fbResponse={this.state.fbResponse}
                          justDialResponse={this.state.justDialResponse}/>
                </div> : null}
        </div>);
    }
}
export default CompanyName;