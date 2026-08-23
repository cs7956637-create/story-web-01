import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'

const Getpro = () => {
    async function getdata() {
        const res=await axios.get("https://story-app-backend-hlrp.onrender.com/data")
        localStorage.setItem("token",res.data.token)
        console.log(res.data);
        
        
    }

    useEffect(()=>{
        getdata()
    },[])

  return (
    <div>Getpro</div>
  )
}

export default Getpro