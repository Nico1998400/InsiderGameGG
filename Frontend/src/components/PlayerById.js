import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

function PlayerById() {
  const [users, setUsers] = useState([]);

  const { username } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/insider/username/${username}`)
      .then((res) => {
        setUsers(res.data);
        console.log(res.data);
      });
  }, [username]);


  const name = users.username;
  const title = users.title;
  const id = users.id;
  const score = users.score;
  const host = users.host;

  return (
    <>
      <div className="w-[100vw] h-full justify-center items-center flex flex-col px-10 py-8 mt-8">
        <h1 className="text-3xl font-bold">DATA TABLE</h1>
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
                        ID
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-lg text-white px-6 py-4"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-lg text-white px-6 py-4"
                      >
                        Title
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-lg text-white px-6 py-4"
                      >
                        Score
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-lg text-white px-6 py-4"
                      >
                        Host
                      </th>
                    </tr>
                  </thead>
                  <tbody className="border-black border-b-2">
                    <tr className="bg-white border-b-2 border-black">
                      <td className="text-xl text-gray-900 font-semibold px-6 py-4 whitespace-nowrap">
                        {id}
                      </td>
                      <td className="text-xl text-gray-900 font-semibold px-6 py-4 whitespace-nowrap">
                        {name}
                      </td>
                      <td className="text-xl text-gray-900 font-semibold px-6 py-4 whitespace-nowrap">
                        {title}
                      </td>
                      <td className="text-xl text-gray-900 font-semibold px-6 py-4 whitespace-nowrap">
                        {score}
                      </td>
                      <td className="text-xl text-gray-900 font-semibold px-6 py-4 whitespace-nowrap">
                        {host}
                      </td>

                      <td className="text-sm flex justify-between  items-center text-gray-900 font-bold px-6 py-4 space-x-4 whitespace-nowrap"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <Link
          to={`/Vote/${username}`}
          className="bg-green-600 text-white px-6 py-2 rounded-lg"
        >
          Vote
        </Link>
      </div>
    </>
  );
}

export default PlayerById;
