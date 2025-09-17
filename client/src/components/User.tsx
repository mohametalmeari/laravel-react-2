// @ts-nocheck

import { useStateContext } from "@/contexts/store";
import { axiosClient } from "@/lib/axios-client";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export const User = () => {
  const { user, setUser, setToken } = useStateContext();
  const [hovered, setHovered] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setDisabled(true);
    axiosClient
      .get("/user")
      .then(({ data }) => {
        console.log(data);
        setUser(data);
      })
      .catch(() => {})
      .finally(() => {
        setDisabled(false);
      });
  }, [setUser]);

  const handleSignout = () => {
    setDisabled(true);
    axiosClient
      .post("/logout")
      .then(() => {
        setToken(null);
      })
      .finally(() => {
        setDisabled(false);
      });
  };

  if (!user?.name) {
    return null;
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="text-yellow-100 font-semibold text-xl bg-green-500 aspect-square w-10 flex items-center justify-center rounded-full">
        {user?.name[0]}
      </div>
      <div
        className="absolute left-full top-0"
        style={{ display: hovered ? "block" : "none" }}
      >
        <div className="bg-white text-gray-600 ml-2 whitespace-nowrap border border-gray-200 px-2 rounded shadow flex flex-col items-start py-2">
          <p>{user?.name}</p>
          <p>{user?.email}</p>
          <Button
            variant={"destructive"}
            className="mt-2"
            onClick={handleSignout}
            disabled={disabled}
          >
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
};
