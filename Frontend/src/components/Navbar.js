import { Box, AppBar, Toolbar, IconButton, Typography, Button, Stack } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import React from "react";
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";


function Navbar() {
  return (
    <>
        <div className="w-ful h-16 flex items-center px-12 bg-red-600">
            <Link to={"/Insider"} className="text-3xl text-white font-semibold font-Montesarrat">INSIDER</Link>
          
           <div className='w-full flex items-center p-12 '>
            <Link to={"/Host"} className="hover:bg-black
            hover:border-2 hover:border-white hover:text-green-400 hover:shadow-md rounded-lg font-bold text-white py-2 px-2">Host Game</Link>
            <Link to={"/Join"} className="hover:bg-black
            hover:border-2 hover:border-white hover:text-green-400 hover:shadow-md rounded-lg font-bold text-white py-2 px-2">Join Game</Link>
            <Link to={"/Lobby"} className="hover:bg-black
            hover:border-2 hover:border-white hover:text-yellow-400 hover:shadow-md rounded-lg font-bold text-white py-2 px-2">Lobby</Link>
            <Link to={"/Vote"} className="hover:bg-black
            hover:border-2 hover:border-white hover:text-teal-200 hover:shadow-md rounded-lg font-bold text-white py-2 px-2">Vote</Link>
            <Link to={"/Status"} className="hover:bg-black
            hover:border-2 hover:border-white hover:text-teal-200 hover:shadow-md rounded-lg font-bold text-white py-2 px-2">Status</Link>
          </div>
        </div>
    </>
  )
}
  

export default Navbar