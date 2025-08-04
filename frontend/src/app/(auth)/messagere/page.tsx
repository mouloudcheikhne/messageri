"use client";
import axios from "axios";
import {
  CirclePlus,
  CircleUser,
  CircleX,
  LogOut,
  Menu,
  SendHorizontal,
} from "lucide-react";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";
// type Message = {
//   contenu: string;
//   userSender: string;
//   userresorve: string;
//   sender: booleanr;
//   resorve: booleanr;
//   userresorve_id: string;
// };
type messageSend = {
  contenu: string;
  userresorve: string;
};
const API_PATH = process.env.NEXT_PUBLIC_API_PATH;
export default function page() {
  const route = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [userTrouve, setusertrouve] = useState("");
  const [userConect, setUserConect] = useState("");
  const [lodingData, setLoginData] = useState(false);
  const [token, setToken] = useState();
  const [userShearche, setUserShearche] = useState("");
  const [valideSherch, setvalidesherch] = useState(false);
  const [errorSherche, seterrorSherche] = useState("");
  const [messageSend, setMessageSend] = useState<messageSend>({
    contenu: "",
    userresorve: "",
  });
  const [message, setMessage] = useState([]);
  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log("email user ckecked", UserCheked);
      console.log(messageSend);
      await axios.post(`${API_PATH}/message/add`, messageSend, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // axios.post(`${API_PATH}/message`, message);
      setMessageSend({ ...messageSend, contenu: "" });

      getAll();
      getAllMessage(messageSend.userresorve);
    } catch (err) {
      console.log(err);
    }
  };
  const getAllMessage = async (email) => {
    try {
      // /messages/:email
      const responce = await axios.get(
        `${API_PATH}/message/messages/${email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(responce.data);
      // setLoginData(true);
      // console.log(responce.data);
      // console.log("all message", email);
    } catch (err) {
      console.log(err);
    }
  };
  const getAll = async () => {
    try {
      // console.log(token);
      const responce = await axios.get(`${API_PATH}/message/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(responce.data);
      setLoginData(true);
      // console.log(responce.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("user")) {
      const user = JSON.parse(localStorage.getItem("user"));
      setToken(user.token);
      setUserConect(user.email);
    }
  }, []);
  useEffect(() => {
    getAll();
  }, [token]);
  const handelshearche = async () => {
    try {
      console.log(userShearche);
      const responce = await axios.post(
        `${API_PATH}/auth/get_user`,
        { email: userShearche },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(responce.data);
      seterrorSherche("");
      setusertrouve(userShearche);
      setvalidesherch(true);
    } catch (err) {
      setusertrouve("");
      seterrorSherche("cette email pas trouve");
      console.log(err);
    }
  };
  const [users, setUsers] = useState([]);
  const logout = (e) => {
    localStorage.removeItem("user");
    route.push("/");
  };
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
      <div className="  w-[260px] bg-gray-200 h-screen fixed top-0 left-0 hidden md:flex overflow-y-auto overflow-x-hidden  flex-col">
        <ul className="w-full h-full flex flex-col flex-grow-1">
          <div className="flex justify-between bg-blue-300 py-2 px-3 items-center rounded-md shadow-md">
            <p>Discussion</p>
            <CirclePlus
              className="w-8 h-8 text-white"
              onClick={(e) => setShowModal(true)}
            />
          </div>
          <div
            className={` ${
              showModal
                ? "w-[300px]  fixed top-14 left-52 z-50 bg-white shadow-xl"
                : "hidden"
            }`}
          >
            <div className="flex justify-between items-center bg-gray-100 p-3  mb-3 uppercase font-serif">
              <p>ajoute comtact</p>
              <CircleX
                className="w-8 h-8 text-black"
                onClick={(e) => {
                  setShowModal(false);
                  seterrorSherche("");
                  setUserShearche("");
                }}
              />
            </div>
            <div className="flex flex-col gap-3 mt-3 items-center px-3">
              <input
                type="text"
                className="w-full p-3 bg-gray-200 rounded-xl"
                onChange={(e) => {
                  setUserShearche(e.target.value);
                  setusertrouve("");
                  seterrorSherche("");
                }}
              />
              <button
                className="bg-blue-950 px-4 py-2 w-1/2 text-white rounded-md"
                onClick={handelshearche}
              >
                Ajoute
              </button>
              <div className="w-full mb-3">
                {userTrouve && (
                  <button
                    className="bg-blue-200 p-3 w-full rounded-xl "
                    onClick={() => {
                      getAllMessage(userShearche);
                      setMessageSend({
                        ...messageSend,
                        userresorve: userShearche,
                      });
                      setShowModal(false);
                    }}
                  >
                    {userShearche}
                  </button>
                )}
                {errorSherche && (
                  <div className="text-white text-sm mt-2 bg-red-300 p-3">
                    {errorSherche}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className=" flex  justify-center mt-3  m-1 w-full  ">
            <input
              type="search"
              name=""
              id=""
              placeholder="search"
              className="p-2 bg-gray-50  rounded-[8px]"
            />
          </div>
          {!lodingData && <p className="text-red-400">data loding</p>}
          {users.map((user) => (
            <li
              onClick={(e) => {
                getAllMessage(user);
                setMessageSend({ ...messageSend, userresorve: user });
              }}
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
        <button
          className="bg-red-400 p-3 m-2 rounded-md flex gap-6 px-3 items-center"
          onClick={logout}
        >
          <LogOut className="w-8 h-8" />{" "}
          <span className="text-white text-xl">Logout</span>
        </button>
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
        <div className="bg-gray-50 flex-grow-1 overflow-y-auto mt-3">
          {message.length === 0 && (
            <p className="text-center text-gray-500">No messages </p>
          )}
          {message.map((mes) => (
            <div
              key={mes.id}
              className={`flex my-2  mx-4 ${
                mes.userSender === userConect ? "justify-start" : "justify-end"
              }`}
            >
              {mes.userSender === userConect ? (
                <p className="bg-gray-300 shadow-md max-w-[200] py-3 px-5 rounded-md">
                  {mes.contenu}
                </p>
              ) : (
                <p className="bg-blue-300 w-[160px] shadow-md max-w-[200] py-3 px-5 rounded-md">
                  {mes.contenu}
                </p>
              )}
            </div>
          ))}
        </div>
        <div className=" h-12 rounded-[10px] m-3 flex justify-between">
          <textarea
            name=""
            id=""
            value={messageSend.contenu}
            onChange={(e) =>
              setMessageSend({ ...messageSend, contenu: e.target.value })
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
