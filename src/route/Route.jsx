import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import {Switch} from "react-router";
import App from "../app/App.jsx";
import CompanyName from "../searchby/CompanyName.jsx";
import Uo1KeyWord from "../searchby/Uo1KeyWord.jsx";

class Routes extends React.Component {
    render () {
        return(
            <Router>
            <Switch>
                <Route exact path="/" component={App} />
                <Route exact path="/companyname" component={CompanyName}/>
                <Route exact path="/uo1keyword" component={Uo1KeyWord}/>
            </Switch>
            </Router>    
        )
    }
}
export default Routes;