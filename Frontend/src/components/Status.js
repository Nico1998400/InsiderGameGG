import axios from "axios";
import React, { useEffect, useState } from "react";


const Status = () => {

const [users, setUsers] = useState([]);


let message =''



  useEffect(() => {
    axios
    .get("http://localhost:5000/insider/status").then((res) => {
      setUsers(res.data);
      console.log(res.data);
    });
  }, []);

let scoreboard = users.map(x => x.username + " " + x.score)
console.log(scoreboard)


return (
  <>
    <div className="w-[100vw] h-full justify-center items-center flex flex-col px-10 py-8 mt-8">
    <h1 className="text-3xl font-bold">STATUS</h1>
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
                
                    <tr
                
                      className="bg-white border-b-2 border-black"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black ">
                      {message}
                      </td>
                      <td className="text-xl text-black font-semibold px-6 py-4 whitespace-nowrap">
                      {scoreboard}
                      </td>
                  

                      <td className="text-sm flex justify-between  items-center text-gray-900 font-bold px-6 py-4 space-x-4 whitespace-nowrap">
                

           
                      </td>
                    </tr>
          
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

   
  </>
);
}

export default Status