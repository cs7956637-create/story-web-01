import { BrowserRouter, Routes, Route } from "react-router-dom";


import Login from "./componets/Login";
import Profile from "./componets/Profile";
import CreateDocument from "./componets/CreateDocument";
import Documents from "./componets/Documets";
import Navbar from "./componets/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Signup } from "./componets/Signup";
import Story from "./componets/Story";


function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/signup" element={<Signup/>} />
        <Route path="/" element={<Login/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/create" element={<CreateDocument/>} />
        <Route path="/documets" element={<Documents/>} />
        <Route path="/story/:id" element={<Story/>} />
      </Routes>
        <ToastContainer
        position="top-right"
        autoClose={2000}
        theme="dark"
      />
    </BrowserRouter>
  );
}

export default App;