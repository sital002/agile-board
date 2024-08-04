import React from "react"
// import { Navigate } from "react-router-dom"
import { Fragment } from "react/jsx-runtime"

const PublicRoute=({children}:{children:React.ReactNode})=>{
    // const value=true
    // if(value){
    //     <Navigate to={'/board'}/>
    // }
    return <Fragment>{children}</Fragment>
}

export default PublicRoute