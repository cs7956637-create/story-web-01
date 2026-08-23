import React from "react";
import axios from "axios";
import { toast } from "react-toastify";

function CreateDocument() {

  async function sendData(e) {
    e.preventDefault();

    const data = new FormData(e.target);
      const token = localStorage.getItem("token");
    try {

      await axios.post(
        "http://localhost:3000/documents",
        data,
          {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
      );

      // alert("Saved successfully");
       toast.success("Saved successfully");

    } catch (error) {
      console.log(error);
    }
  }

  return (
   <div className="min-h-screen bg-slate-950  w-full flex items-center justify-center ">
  
    <div className=" w-full max-w-md bg-slate-900 p-8 rounded-2xl shadow-2xl flex items-center justify-center ">
      
       <form onSubmit={sendData} cl>
 <h1 className="text-white text-center text-2xl font-bold pb-4">CREATE-DOCUMENT</h1>
      <input className="w-full rounded-lg p-3"
        type="text"
        name="title"
        placeholder="Document title"
      />
<br></br>
<br></br>
      <textarea className="w-full rounded-lg p-3"
        name="content"
        rows="15"
        placeholder="Write your story..."
      />
<br />
<br />
      <input className="text-red-100"
        type="file"
        name="image"
        accept="image/*"
      />
      <br />
      <br />
    

      <button type="submit"  className=" ml-20 w-20 bg-purple-600 hover:bg-purple-700
      text-white font-semibold py-3 rounded-lg
      transition duration-200">
        Save
      </button>

    </form>
    </div>
   </div>
  );
}

export default CreateDocument;
