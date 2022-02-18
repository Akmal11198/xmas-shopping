import { Dispatch, ReactNode, SetStateAction } from "react";

export type AppWrapperProps = {
  children: ReactNode;
};

export type AppContextProps = {
    users:User[],
    setUsers:Dispatch<SetStateAction<User[]>>,
    bin:CartItem[],
    setBin:Dispatch<SetStateAction<CartItem[]>>,
    cart:Cart,
    setCart:Dispatch<SetStateAction<Cart>>,
    addToCart:(item:CartItem)=>void,
    removeFromCart:(item:CartItem)=>void,
    inCart:(item:CartItem)=>Boolean,
    round:(n:number)=>number,
    curUser:number,
    setCurUser:Dispatch<SetStateAction<number>>
};

export type WishList = {
  id: number;
  userId: number;
  date: Date;
  products: {
    productId: number;
    quantity: number;
  }[];
};

export type Product={
  id:number,
  title:string,
  price:string,
  category:string,
  description:string,
  image:string
}

export type User={
  id:number,
  email:string,
  username:string,
  password:string,
  name:{
      firstname:string,
      lastname:string
  },
  address:{
      city:string,
      street:string,
      number:number,
      zipcode:string,
      geolocation:{
          lat:string,
          long:string
      }
  },
  phone:string

}

export type Cart={
  total:number,
  items:CartItem[]
}

export type CartItem={
  userId:number,
  product:Product,
  count:number,
  sale:boolean
}