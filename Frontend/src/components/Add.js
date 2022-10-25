import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";



function Add() {
  const [username, setUserName] = useState("");

  const navigate = useNavigate();

  function submitForm(e) {
    e.preventDefault();
    axios.post(`http://localhost:5000/insider/add/user/${username}`).then(navigate("/Lobby"));
  }
  return (
    <div className="w-screen h-full flex flex-col justify-center items-center mt-16">
      <h2 className="text-2xl font-bold">JOIN GAME</h2>
      <form className="w-[50%] h-full flex flex-col mt-2">
        <input
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          className="bg-white/10 outline-none font-normal border border-zinc-400 py-6 pl-6 mt-4"
          type="text"
          placeholder="Enter your name"
        />

        <button
          className="bg-teal-600 outline-none font-bold border text-white border-zinc-400 py-4 pl-4 mt-4"
          type="submit"
          onClick={submitForm}
        >
          JOIN GAME
        </button>
      </form>
    </div>
  );
}

export default Add;