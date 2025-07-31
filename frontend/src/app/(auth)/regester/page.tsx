"use client";
import Link from "next/link";
import React, { useState } from "react";

type regesterDta = {
  nom: string;
  prenom: string;
  password: string;
  email: string;
};

export default function page() {
  const [data, SetData] = useState<regesterDta>({
    nom: "",
    prenom: "",
    email: "",
    password: "",
  });
  const handelsubmit = (e) => {
    e.preventDefault();

    try {
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className=" container flex justify-center items-center h-screen   ">
      <div className="w-full md:w-[400px] h-[470px] bg-gray-300  px-4 py-7  rounded-md">
        <p className="text-black font-light font-serif  text-2xl   text-center w-full p-5  bg-gray-200 rounded-md">
          Regester
        </p>
        <form action="" onSubmit={handelsubmit}>
          <div className=" flex flex-col  m-2 ">
            <input
              type="text"
              name=""
              id=""
              onChange={(e) => {
                SetData({ ...data, nom: e.target.value });
              }}
              placeholder="entre nom"
              className="bg-gray-200 p-3 m-2  outline-0"
            />
            <input
              type="text"
              name=""
              id=""
              onChange={(e) => {
                SetData({ ...data, prenom: e.target.value });
              }}
              placeholder="entre prenom"
              className="bg-gray-200 p-3 m-2  outline-0"
            />
            <input
              type="email"
              name=""
              id=""
              onChange={(e) => {
                SetData({ ...data, email: e.target.value });
              }}
              placeholder="entre email"
              className="bg-gray-200 p-3 m-2  outline-0"
            />

            <input
              type="password"
              name=""
              id=""
              onChange={(e) => {
                SetData({ ...data, password: e.target.value });
              }}
              placeholder="entre password"
              className="bg-gray-200 p-3 m-2 outline-0"
            />
            <button className="bg-gray-800 p-3 mx-2 mt-3 text-white">
              regestere
            </button>

            <p className=" m-2">
              si il ya un compte ?
              <span className="text-blue-700 ">
                <Link href={"/"}>Login</Link>
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
