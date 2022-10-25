import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useNavigate , useParams} from "react-router-dom";

const Vote = () => {
    const [users, setUsers] = useState([]);
    const [username, setUserName] = useState("")
    const [userguess, setUserGuess] = useState("")
    const [status, setStatus] = useState([])
    const [results, setResults] = useState('')

    const navigate = useNavigate();

    let message =''
    let voteMessage = ''
    let result = []

    useEffect(() => {
      axios
      .get("http://localhost:5000/insider/allusers").then((res) => {
        setUsers(res.data);
        console.log(res.data);
        gameStats()
      });
    }, []);

async function gameStats(){
  console.log('STAUSCALL')
  await axios.get("http://localhost:5000/insider/status").then((res) => {
    setStatus(res.data);
    console.log(res.data);
  });
}


   async function startVote(e) {
        e.preventDefault();
       await axios.put(`http://localhost:5000/insider/vote/${username},${userguess}`).then(
       window.location.reload(true));
         
      }


  let gameRunning = false;


  for (let x of users) {
    if (x.title === 'Game host') {
      gameRunning = true
    }
  }
  
  if (gameRunning) {
    message = 'Game is running'
    console.log("Spelet är igång")
  } else {
    message = 'Spelet är inte igång'
    console.log("Spelet är inte igång")
  }

  const votes = users.map(x => x.hasVoted === true ? 1 : 0)
  .reduce((prev, curr) => prev + curr, 0)


  let objInsider = users.filter(x => x.title === 'Insider')

  if (votes === users.length ) {
    console.log(" Alla har röstat")

    if (objInsider.voteCount > (users.length / 2)) {
      result = 'Majority has voted right'
      console.log("Majoriteten har röstat rätt")



    } else {
      console.log("Majoriteten har röstat fel")
      result = 'Majority has voted wrong'
    }

  } else {
    console.log(votes + " av " + users.length + " har röstat")
    voteMessage = (votes + " of " + (users.length) + " has voted")
  }



  return (
    <div>
      <div className="w-screen h-full flex flex-col justify-center items-center mt-16">
        <h2 className="text-2xl font-bold">VOTE</h2>
        <form className="w-[50%] h-full flex flex-col mt-2">
          <input
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            className="bg-white/10 outline-none font-normal border border-zinc-400 py-6 pl-6 mt-4"
            type="text"
            placeholder="Enter your username"
          />
          <input
            value={userguess}
            onChange={(e) => setUserGuess(e.target.value)}
            className="bg-white/10 outline-none font-normal border border-zinc-400 py-6 pl-6 mt-4"
            type="text"
            placeholder="Enter your guess"
          />

          <button
            className="bg-green-400 outline-none font-bold border text-white border-zinc-400 py-4 pl-4 mt-4"
            type="submit"
            onClick={startVote}
          
        
          >
            SUBMIT
          </button>
        </form>
      </div>

      <div className="w-[100vw] h-full justify-center items-center flex flex-col px-10 py-8 mt-2">
        <div className="flex flex-col">
          <div className="overflow-x-auto mt-8 sm:-mx-6 items-center lg:-mx-8">
            <div className="py-4 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-center">
                  <thead className="border-b bg-gray-800">
                    <tr>
                      <th
                        scope="col"
                        className="text-sm font-medium text-white px-6 py-4"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-lg text-white px-6 py-4"
                      >
                        Vote count
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-lg text-white px-6 py-4"
                      ></th>
                    </tr>
                  </thead>
                  <tbody className="border-black border-b-2">
                    <tr className="bg-white border-b-2 border-black">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black ">
                        {message}
                      </td>
                      <td className="text-xl text-black font-semibold px-6 py-4 whitespace-nowrap">
                        {voteMessage}
                      </td>

                      <td className="text-sm flex justify-between  items-center text-gray-900 font-bold px-6 py-4 space-x-4 whitespace-nowrap"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[100vw] h-full justify-center items-center flex flex-col px-10 py-8">
        <div className="flex flex-col">
          <div className="overflow-x-auto mt-8 sm:-mx-6 items-center lg:-mx-8">
            <div className="py-4 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-center">
                  <thead className="border-b bg-gray-800">
                    <tr>
                      <th
                        scope="col"
                        className="text-sm font-medium text-white px-6 py-4"
                      >
                        Results
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-lg text-white px-6 py-4"
                      >
                        Scoreboard
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-lg text-white px-6 py-4"
                      ></th>
                    </tr>
                  </thead>
                  <tbody className="border-black border-b-2">
                    <tr className="bg-white border-b-2 border-black">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black ">
                        {result}
                      </td>
                      <td className="text-xl text-black font-semibold px-6 py-4 whitespace-nowrap">
                        {status}
                      </td>

                      <td className="text-sm flex justify-between  items-center text-gray-900 font-bold px-6 py-4 space-x-4 whitespace-nowrap"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}

export default Vote