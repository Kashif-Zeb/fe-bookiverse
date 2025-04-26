import React from "react";
import { Alert } from "antd";

const AlertCustom = ({ type, message, visible })=>{


    return(
        <div style={{maxWidth:400 , margin:'0 auto'}}>
            {visible && (
                <Alert
                style = {{marginBottom:16}}
                type={type}
                message = {message}
                showIcon
                />
            )}
        </div>
    )
}

export default AlertCustom