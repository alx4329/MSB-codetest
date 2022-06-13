import React  from "react";
import {useLocation, useNavigate} from 'react-router-dom'
import './pageBar.css'
const PageBar = () => {
    const location = useLocation();
    const path = location.pathname;
    console.log(path)
    const navigate = useNavigate();
    const goHistory = () => {
        navigate("/historyRate");
    }
    const goGetRate = () => {
        navigate("/getRate");
    }
    return(
        <div className="bar-container" >
            <button className={path==="/getRate" ?"active":"inactive"} onClick={goGetRate} >GetRate</button>
            <button className={path==="/historyRate" ?"active":"inactive"} onClick={goHistory} >Rate 30 Day History</button>
        </div>
    )
}

export default PageBar;