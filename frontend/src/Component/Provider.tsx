"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
type props = {
  children: React.ReactNode;
  Role: string;
};
export default function Provider({ children, Role }: props) {
  const [valide, setValide] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem("user")) {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user.role === Role) {
        setValide(true);
      } else {
        router.push("/");
      }
    } else {
      router.push("/");
    }
  }, [Role]);
  if (!valide) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }
  return <div>{children}</div>;
}
