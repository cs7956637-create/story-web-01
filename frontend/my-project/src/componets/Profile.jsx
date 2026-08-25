import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);
const [document, setDocument] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/");
          return;
        }

        const res = await axios.get(
          "https://story-app-backend-hlrp.onrender.com/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        console.log("PROFILE RESPONSE:", res.data);

        setUser(res.data.user);

      } catch (error) {
  console.log("PROFILE ERROR:", error.response?.data);
  console.log("TOKEN:", localStorage.getItem("token"));

  // localStorage.removeItem("token");  // temporary ga remove cheyyi
  // navigate("/");                     // temporary ga remove cheyyi
}
    };


    //getdocumets
      
       const getDocument = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      "https://story-app-backend-hlrp.onrender.com/dataget",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    

    setDocument(response.data);
  } catch (error) {
    console.log(error.response?.data || error.message);
  }
};
  getDocument();

    getProfile();
  }, [navigate]);

  if (!user) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <h1 className="text-2xl text-center font-extrabold uppercase ">Profile</h1>

    <div className="bg-slate-900 m-9 rounded-xl  ">
       <div className="flex justify-center items-center">
         <h2 className="p-4 uppercase underline text-center text-gray-200 font-extrabold ">Name : {user.name}</h2>
        </div>

      <p className="p-4 uppercase underline text-center text-gray-200 font-extrabold">ID: {user._id}</p>
      

     <div className="flex justify-center items-center">
    
       <button className="w-28 bg-purple-600 hover:bg-purple-700 align-top
      text-white font-semibold py-3 rounded-lg
      transition duration-200 mb-2 text-center "
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/");
        }}
      >
        Logout
      </button>
     </div>
    </div>
    </div>
  );
}

export default Profile;