import { CartItem, Product, User, WishList } from "../utils/types";
import { useAppContext } from '../context/AppContext';
import { useEffect } from "react";
import Link from "next/link";

const Home = (props:{users:User[],products:CartItem[]}) => {
  const {setUsers,setBin}=useAppContext();
  console.log(props.products)
  useEffect(()=>{
    if (typeof window !== "undefined") {
      window.localStorage.setItem("users",JSON.stringify(props.users))
      window.localStorage.setItem("bin",JSON.stringify(props.products))
      }
    if(setUsers)setUsers(props.users);
    if(setBin)setBin(props.products);
  })
  return (
    <div id="mainDiv">
      <h1 id="mainH">Welcome To Droppe Xmas</h1>
      <Link href="/wishlists" as="/wishlists"  passHref>
        <button id="button">Let's Get Started</button>
      </Link>
    </div>
  );
};

export default Home;
export const getStaticProps = async () => {
  let response = await fetch(`https://fakestoreapi.com/users?limit=8`);
    let users:User[] = await response.json();
    users.splice(4,3);
    const products:CartItem[]=[];
    for (let u of users){
      response = await fetch(`https://fakestoreapi.com/carts/user/${u.id}`);
      const listDataArr:WishList[] = await response.json();
      const listData=listDataArr[0];
      for (let p of listData.products){
        response = await fetch(`https://fakestoreapi.com/products/${p.productId}`);
        let pDetails:Product=await response.json();
        products.push({product:pDetails,count:p.quantity,userId:u.id,sale:false});
      }
    }
  return {
    props: {
     users,
     products
    },
    revalidate: 60,
  };
};
