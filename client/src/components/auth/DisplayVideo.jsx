import React from "react";
import video from "../../../src/assests/vid12.mp4";

export default () => {
    return(
        <video id="bgVideo"  preload="true" autoPlay loop muted>
                    <source src={video} type="video/mp4" /> 
        </video>
    )
}