import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'

const Getpro = () => {
    async function getdata() {
        const res=await axios.get("http://localhost:3000/data")
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