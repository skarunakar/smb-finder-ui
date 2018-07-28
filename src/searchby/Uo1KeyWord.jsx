import React from "react";
import superagent from "superagent";
import TabKeyword from "../components/TabKeyword.jsx";
import Spinner from "../components/Spinner.jsx";
import app from "../sass/smb_finder.scss";
class Uo1KeyWord extends React.Component {
    constructor(props) {
        super(props);
        this.uo1Keyword = "";
        this.state = {
            searchResponse: [],
            isDataLoaded: false,
            isDataLoading: false
        }
    }
    convertToCSV = (objArray) => {
        let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
        let str = '';
        for (var key in objArray[0]) {
            str += key + ', ';
        }
        str += "\r\n";
        for (var i = 0; i < array.length; i++) {
        let line = '';
        for (let index in array[i]) {
            if (line != '') line += ',';

            line += array[i][index];
        }

            str += line + '\r\n';
        }

        return str;
    }
    handleUo1 = (e) => {
        if(e.keyCode === 13) {
            this.handleSubmit();
        }
        this.uo1Keyword = e.target.value;
    }
    handleDownload = (actionDownload) => {
        if (actionDownload) {
            if(this.state.searchResponse.length === 0) {
                alert("Something went wrong!! Try again later!!")
                return;
            }
            let csv = this.convertToCSV(this.state.searchResponse);

            let exportedFilename = "smb" + '.csv' || 'export.csv';

            let blob = new Blob([csv], {type: 'text/csv;charset=utf-8;'});
            if (navigator.msSaveBlob) {
                navigator.msSaveBlob(blob, exportedFilename);
            } else {
                let link = document.createElement("a");
                if (link.download !== undefined) {
                    let url = URL.createObjectURL(blob);
                    link.setAttribute("href", url);
                    link.setAttribute("download", exportedFilename);
                    link.style.visibility = 'hidden';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
            }
        }
    }
    handleSubmit = (actionDownload) => {
        if (!this.uo1Keyword.trim()) {
            return;
        }
        let mcaUrl = "https://infinite-falls-73031.herokuapp.com/smbfinder/companysearchresults/" + this.uo1Keyword;
        superagent
            .get(mcaUrl)
            .end((err, res) => {
                if (res && res.text && res.statusCode === 200 &&JSON.parse(res.text).length!=0) {
                    this.setState({searchResponse: JSON.parse(res.text)}, () => {this.handleDownload(actionDownload)});
                } else {
                    alert("Something went wrong!! Try again later!!")
                    this.setState({searchResponse: [{notFound: "No Result Found"}]});
                }
                this.setState({isDataLoading: false, isDataLoaded: true});
            });

        this.setState({searchResponse: [], isDataLoading: true, isDataLoaded:false});
    }
    render() {
        return(<div className="uo1-keyword">
            <div className="navbar-header"/>
            <h2>SBM Finder</h2>
            <div className="container-input">
                <p>Enter Uo1 KeyWord</p>
                <input onKeyUp={this.handleUo1}/>
            </div>
            <div className="buttons">
                <button className="go" onClick={() => this.handleSubmit(false)}>GO</button>
                <button className="download" onClick={() => this.handleSubmit(true)}>Download Results</button>
            </div>    
            {this.state.isDataLoading ? <Spinner/> : null}
            {this.state.isDataLoaded ?
                <div className="container-result">
                    <p className="query-header"><b>You Queried for:</b></p>
                    <TabKeyword searchResponse={this.state.searchResponse}/>
                </div> : null}
        </div>);
    }
}
export default Uo1KeyWord;