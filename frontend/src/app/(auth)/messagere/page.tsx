"use client";
import React, { useState } from "react";

export default function page() {
  const [users, setUsers] = useState([
    { id: 1, nom: "melike", email: "melike@gmail.com" },
    { id: 2, nom: "sidi", email: "sidi@gmail.com" },
    { id: 3, nom: "noure", email: "noure@gmail.com" },
    { id: 4, nom: "ali", email: "ali@gmail.com" },
    ,
  ]);
  return (
    <div className="flex container mx-auto">
      <div className="  w-[230px] bg-gray-200 h-screen fixed top-0 left-0 hidden md:flex overflow-y-auto overflow-x-hidden">
        <ul className="w-full h-full flex flex-col">
          <p className=" flex  justify-between  m-1 w-full ">
            <input
              type="search"
              name=""
              id=""
              placeholder="search"
              className="p-2 bg-gray-50  rounded-[8px]"
            />
          </p>
          {users.map((user) => (
            <li key={user.id} className="bg-white p-4 m-2 rounded-[8px]">
              {user.email}
            </li>
          ))}
        </ul>
      </div>
      <div className=" w-full h-screen md:ml-[240px] flex flex-col">
        <div className="bg-white shadow-md w-full h-14 flex justify-between md:justify-end">
          <button className="bg-black text-white  md:hidden">menu</button>
          <button className="bg-black text-white ">profile</button>
        </div>
        <div className="bg-gray-50 h-[600px] overflow-y-auto mt-4"></div>
        <div className=" h-12 rounded-[10px] m-3 flex justify-between">
          <input
            type="text"
            name=""
            id=""
            className="bg-blue-200 p-3 flex-grow-1 rounded-[10px] outline-0"
          />
          <span className="px-4 py-2 rounded-[8px] bg-amber-100 ml-2">
            send
          </span>
        </div>
      </div>
    </div>
  );
}
