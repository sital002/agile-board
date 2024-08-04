import React, {  useLayoutEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { Fragment } from "react/jsx-runtime"

const ProctedRoute=({children}:{children:React.ReactNode})=>{
    const[auth,setAuth]=useState<boolean>()

    const checkAuth=async()=>{
        const resp=await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/me`,{
            method:'GET',
            // credentials:'include'
        })
        const data=await resp.json()
        console.log(data)
        setAuth(data.status)
    }

    useLayoutEffect(()=>{
        checkAuth()
    },[auth])
    
    if(!auth){
        return <Navigate to={'/signin'}/>
    }
    return <Fragment>{children}</Fragment>
}

export default ProctedRoute