import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { CartItem, User } from "./types";

export const Loader = ({ children }: any) => {
  const { setCart, setUsers,users,cart,bin,setBin } = useAppContext();
  const [done,setDone]=useState(false)
  useEffect(() => {
    if(!users&&setUsers&&typeof window !== "undefined")setUsers(JSON.parse(window.localStorage.getItem("users")!)||[] as User[])
    if(!bin&&setBin&&typeof window !== "undefined")setBin(JSON.parse(window.localStorage.getItem("bin")!)||[] as CartItem[])
    if(!cart&&setCart&&typeof window !== "undefined")setCart(JSON.parse(window.localStorage.getItem("myCart")!)||{total:0,items:[]})
    if(cart&&users&&bin)setDone(true)
  }, [cart,users,bin]);

  return (done?children:<></>)
};
