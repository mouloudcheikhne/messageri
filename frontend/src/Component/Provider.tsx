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
    const userStorage = localStorage.getItem("user");
    if (userStorage) {
      const user = JSON.parse(userStorage);

      const dateConect = new Date(user.date_conect);
      const expireTime = dateConect.getTime() + 15 * 60 * 1000; // 15 min en ms
      const now = Date.now();

      if (now >= expireTime) {
        localStorage.removeItem("user");
        router.push("/login");
        return;
      }

      if (user.role === Role) {
        setValide(true);

        const timeLeft = expireTime - now;
        const timer = setTimeout(() => {
          localStorage.removeItem("user");
          router.push("/");
        }, timeLeft);

        return () => clearTimeout(timer);
      } else {
        router.push("/");
      }
    } else {
      router.push("/");
    }
  }, [Role, router]);

  if (!valide) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return <div>{children}</div>;
}
