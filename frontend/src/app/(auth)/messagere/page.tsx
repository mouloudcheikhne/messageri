"use client";
import axios from "axios";
import { CircleUser, Menu, SendHorizontal } from "lucide-react";
import React, { useEffect, useState } from "react";
type Message = {
  contenu: string;
  email_receveur: string;
};
const API_PATH = process.env.NEXT_PUBLIC_API_PATH;
export default function page() {
  const [lodingData, setLoginData] = useState(false);
  const [token, setToken] = useState();

  const [message, setMessage] = useState<Message>({
    contenu: "",
    email_receveur: "melike@gmail.com",
  });
  const handelSubmit = (e) => {
    e.preventDefault();
    try {
      console.log(message);
      // axios.post(`${API_PATH}/message`, message);
    } catch (err) {
      console.log(err);
    }
  };
  const getAll = async () => {
    try {
      console.log(token);
      const responce = await axios.get(`${API_PATH}/message/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(responce.data);
      setLoginData(true);
      console.log(responce.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("user")) {
      const user = JSON.parse(localStorage.getItem("user"));
      setToken(user.token);
    }
  }, []);
  useEffect(() => {
    getAll();
  }, [token]);
  //  { id: 1, nom: "melike", email: "melike@gmail.com" },
  //   { id: 2, nom: "sidi", email: "sidi@gmail.com" },
  //   { id: 3, nom: "noure", email: "noure@gmail.com" },
  //   { id: 125, nom: "ali", email: "ali@gmail.com" },
  //   { id: 24, nom: "ali", email: "ali@gmail.com" },
  //   { id: 20, nom: "ali", email: "ali@gmail.com" },
  //   { id: 25, nom: "ali", email: "ali@gmail.com" },
  //   { id: 211, nom: "ali", email: "ali@gmail.com" },
  //   { id: 26, nom: "ali", email: "ali@gmail.com" },
  //   { id: 28, nom: "ali", email: "ali@gmail.com" },
  //   { id: 17, nom: "ali", email: "ali@gmail.com" },
  //   { id: 199, nom: "ali", email: "ali@gmail.com" },
  //   { id: 178, nom: "ali", email: "ali@gmail.com" },
  const [users, setUsers] = useState([]);
  const colors = [
    "text-red-500",
    "text-blue-500",
    "text-green-500",
    "text-yellow-500",
    "text-purple-500",
    "text-pink-500",
    "text-teal-500",
  ];
  return (
    <div className="flex container mx-auto">
      <div className="  w-[260px] bg-gray-200 h-screen fixed top-0 left-0 hidden md:flex overflow-y-auto overflow-x-hidden">
        <ul className="w-full h-full flex flex-col">
          <p className=" flex  justify-center mt-3  m-1 w-full  j">
            <input
              type="search"
              name=""
              id=""
              placeholder="search"
              className="p-2 bg-gray-50  rounded-[8px]"
            />
          </p>
          {!lodingData && <p className="text-red-400">data loding</p>}
          {users.map((user) => (
            <li
              key={user}
              className="bg-white p-3 m-2 rounded-[8px] flex gap-3 items-center"
            >
              <CircleUser
                className={`w-8 h-8 ${
                  colors[Math.floor(Math.random() * colors.length)]
                }`}
              />
              {user}
            </li>
          ))}
        </ul>
      </div>
      <div className=" w-full h-screen md:ml-[240px] flex flex-col">
        <div className="bg-white shadow-md w-full h-14 flex justify-between md:justify-end ">
          <button className=" text-white  md:hidden">
            <Menu className="w-8 h-8 text-blue-700" />
          </button>
          <button className=" text-white px-4">
            <CircleUser className="w-9 h-9 text-blue-500" />
          </button>
        </div>
        <div className="bg-gray-50 flex-grow-1 overflow-y-auto mt-3"> </div>
        <div className=" h-12 rounded-[10px] m-3 flex justify-between">
          <input
            type="text"
            name=""
            id=""
            onChange={(e) =>
              setMessage({ ...message, contenu: e.target.value })
            }
            className="bg-blue-200 p-3 flex-grow-1 rounded-[10px] outline-0"
          />

          <button
            className="px-4 py-2 rounded-[8px] ml-2 border border-blue-500  "
            onClick={handelSubmit}
          >
            <SendHorizontal className="w-8 h-9 text-blue-700" />
          </button>
        </div>
      </div>
    </div>
  );
}
