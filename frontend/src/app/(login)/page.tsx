"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
type loginData = {
  email: string;
  password: string;
};
type responceLogin = {
  nom: string;
  prenom: string;
  email: string;
  role: string;
  token: string;
};
const API_PATH = process.env.NEXT_PUBLIC_API_PATH;
export default function page() {
  useEffect(() => {
    if (localStorage.getItem("user")) {
      router.push("/messagere");
    }
  }, []);
  const router = useRouter();
  const [formData, setFormData] = useState<loginData>({
    email: "",
    password: "",
  });
  // console.log("api path === ", API_PATH);
  const [data, SetData] = useState<responceLogin>();
  const handelsubmit = async (e) => {
    e.preventDefault();

    try {
      const responce = await axios.post(`${API_PATH}/auth/login`, formData);
      console.log(responce.data);
      SetData(responce.data);
      localStorage.setItem("user", JSON.stringify(responce.data));
      router.push("/messagere");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className=" container flex justify-center items-center h-screen   ">
      <div className="w-full md:w-[400px] h-[350px] bg-gray-300 px-4 py-6  rounded-md">
        <p className="text-black font-light font-serif  text-2xl   text-center w-full p-5 bg-gray-200 rounded-md">
          Authentifiction
        </p>
        <form action="" onSubmit={handelsubmit}>
          <div className=" flex flex-col  ">
            {/* <label htmlFor="" className="mx-2 p-2">
              Email:
            </label> */}
            <input
              type="email"
              name=""
              id=""
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
              }}
              placeholder="entre email"
              className="bg-gray-200 p-3 my-4 mx-2  outline-0"
            />
            {/* <label htmlFor="" className="mx-2 p-2">
              Password:
            </label> */}
            <input
              type="password"
              name=""
              id=""
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
              }}
              placeholder="entre password"
              className="bg-gray-200 p-3 mx-2 outline-0"
            />
            <button className="bg-gray-800 p-3 mx-2 mt-3 text-white">
              se connecte
            </button>

            <p className=" m-2 font-medium font-sans">
              si il ya pas de compte create compte?
              <span className="text-blue-700 ">
                <Link href={"/regester"}>regester</Link>
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
