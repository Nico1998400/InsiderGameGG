import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";

function Host() {
  const [username, setUserName] = useState("");

  function hostGame() {
    axios.put(`http://localhost:5000/insider/host/${username}`);
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
          <Link
            to={`/Lobby/${username}`}
            onClick={hostGame}
            className="bg-green-400 outline-none font-bold border text-white border-zinc-400 py-4 pl-4 mt-4"
            type="submit"
          >
            HOST GAME
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Host;

// route.put("/start/:userAndWord", (req, res) => {
