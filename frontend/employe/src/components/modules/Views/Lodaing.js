
import React from "react";
import ReactLoading from "react-loading";

export default function Loading() {
    return (
        <div className="loading-container">


            <ReactLoading type="spin" color="#00ff00"
                height={100} width={50} />


        </div>
    );
}