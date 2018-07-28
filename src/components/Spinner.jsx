import React from "react";
import app from "../sass/smb_finder.scss"
export default class LoadingSpinner extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let strokeWidth = 1.2;
        return (<div className="spinner">
            <div className="loader">
                <svg className="circular"
                     viewBox="25 25 50 50">
                    <circle className="track" cx="50" cy="50" r="20" fill="none"
                            strokeWidth={strokeWidth}
                            strokeMiterlimit="10"/>
                    <circle className="path" cx="50" cy="50" r="20" fill="none"
                            strokeWidth={strokeWidth}
                            strokeMiterlimit="10"/>
                </svg>
            </div>
        </div>);
    }
}
