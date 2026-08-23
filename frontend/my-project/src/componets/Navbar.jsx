import React from 'react'
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
     <nav className='bg-slate-900 border-b border-slate-800 shadow-lg'>

      
      <div className='max-w-6xl mx-auto px-6 py-4 flex items-center justify-between'>
         {/* <Link to="/signup"  className="px-4 py-2 rounded-lg text-slate-300
            hover:bg-purple-600 hover:text-white
            transition duration-200">signup</Link> */}
        <Link to="/"  className="px-4 py-2 rounded-lg text-slate-300
            hover:bg-purple-600 hover:text-white
            transition duration-200">Login</Link>

        <Link to="/profile" className="px-4 py-2 rounded-lg text-slate-300
            hover:bg-purple-600 hover:text-white
            transition duration-200">Profile</Link>
        <Link to="/create"
         className="px-4 py-2 rounded-lg text-slate-300
            hover:bg-purple-600 hover:text-white
            transition duration-200">Post</Link>
        <Link to="/documets"  className="px-4 py-2 rounded-lg text-slate-300
            hover:bg-purple-600 hover:text-white
            transition duration-200">Documents</Link>
            
      </div>
    </nav>
   
  )
}

export default Navbar