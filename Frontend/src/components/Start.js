import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Start () {
    
    const [username, setUserName] = useState("")
    
    const navigate = useNavigate();

    function hostGame(e) {
      e.preventDefault();
      axios
        .put(`http://localhost:5000/insider/host/${username}`)
        .then(navigate("/Lobby"));
    }

  return (
    <div>
<div className="w-screen h-full flex flex-col justify-center items-center mt-16">
      <h2 className="text-2xl font-bold">HOST</h2>
      <form className="w-[50%] h-full flex flex-col mt-2">
        <input
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          className="bg-white/10 outline-none font-normal border border-zinc-400 py-6 pl-6 mt-4"
          type="text"
          placeholder="Enter your username"
        />
        <button
          className="bg-green-400 outline-none font-bold border text-white border-zinc-400 py-4 pl-4 mt-4"
          type="submit"
          onClick={hostGame}
        >
          HOST GAME
        </button>
      </form>
    </div>

    </div>
  );
}

export default Start


// route.put("/start/:userAndWord", (req, res) => {