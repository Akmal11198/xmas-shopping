import { useEffect, useState } from "react";
import { useAppContext } from "../../../context/AppContext";
import { CartItem, User } from "../../../utils/types";
import styles from "./ListContent.module.css"
import { ProductCard } from "./ProductCard";
export const ListContent = () => {
  const { bin,users,curUser} = useAppContext();
  const[user,setUser]=useState({} as User);
  const[products,setProducts]=useState([] as CartItem[])
  useEffect(()=>{
    if(users&&bin){
      setUser(users[curUser!])
        const items=bin?.filter(i=>(i.userId===users[curUser!].id))
        setProducts(items)
      }
  },[curUser])
  console.log(products)
  return (
    <div className={styles.content}>
      <h2 className={styles.info}>{user?.name?.firstname} {user?.name?.lastname}'s Wish List</h2>
      {products?.map((p,index:number)=>(
        <div key={index}>
       <ProductCard  item={p}/>
       </div>
      ))}
    </div>
  );
};
