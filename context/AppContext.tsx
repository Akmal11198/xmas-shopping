import { createContext, useContext, useState } from "react";
import {
  AppContextProps,
  AppWrapperProps,
  Cart,
  CartItem,
  User,
} from "../utils/types";

export const AppContext = createContext<Partial<AppContextProps>>({});

export function AppWrapper({ children }: AppWrapperProps) {
  const [users, setUsers] = useState(null as unknown as User[]);
  const [bin,setBin]=useState(null as unknown as CartItem[]);
  const [cart, setCart] = useState(null as unknown as Cart);
  const [curUser, setCurUser] = useState(0);

  const addToCart = (item: CartItem) => {
    let count = 0;
    let sum = 0;
    let itemtotal = item.count * parseFloat(item.product.price);
    const newCart: Cart = {
      total: cart.total,
      items: [...cart.items],
    };
    for (let i of newCart.items) {
      if (i.product.id === item.product.id) {
        count += 1;
        sum += i.count * parseFloat(i.product.price);
        i.sale = true;
      }
    }
    newCart.total = round(newCart.total + itemtotal);
    if (count > 0) {
      console.log("sale " + (count + 1) * 10);
      item.sale = true;
      if (count > 1) newCart.total += sum * count * 0.1;
      console.log("total before " + newCart.total);
      sum += itemtotal;
      let discount = round(sum * (count + 1) * 0.1);
      console.log("discount " + discount);
      newCart.total = round(newCart.total - discount);
      console.log("total after " + newCart.total);
    } else {
      sum += itemtotal;
    }
    newCart.items.push(item);

    setCart(newCart);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("myCart", JSON.stringify(newCart));
    }
  };

  const getIndex = (item: CartItem, noUser?: boolean) => {
    if (inCart(item)) {
      for (let i = 0; i < cart.items.length; i++) {
        let curItem = cart.items[i];
        if (noUser) {
          if (item.product.id === curItem.product.id) {
            return i;
          }
        } else {
          if (
            item.userId === curItem.userId &&
            item.product.id === curItem.product.id
          ) {
            return i;
          }
        }
      }
    }
    return -1;
  };

  const round = (n: number) => {
    return parseFloat(n.toFixed(2));
  };

  const removeFromCart = (item: CartItem) => {
    const newCart: Cart = {
      total: cart.total,
      items: [...cart.items],
    };
    let count = 0;
    let sum = 0;
    let itemtotal = item.count * parseFloat(item.product.price);
    for (let i of newCart.items) {
      if (i.product.id === item.product.id) {
        count += 1;
        sum += i.count * parseFloat(i.product.price);
      }
    }
    const n = getIndex(item);
    newCart.items.splice(n, 1);
    if (count > 1) {
      newCart.total += sum * count * 0.1;
      console.log("total before sale: " + newCart.total);
      newCart.total = round(newCart.total - itemtotal);
      console.log("total without item: " + newCart.total);
      count -= 1;
      sum -= itemtotal;
      if (count > 1) {
        newCart.total = round(newCart.total - count * sum * 0.1);
        console.log("total after new sale: " + newCart.total);
      } else {
        for (let i of newCart.items){
          if(i.product.id===item.product.id){
            i.sale=false;
            break;
          }
        }
      }
    } else newCart.total = round(cart.total - itemtotal);
    setCart(newCart);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("myCart", JSON.stringify(newCart));
    }
  };
  const inCart = (newItem: CartItem) => {
    return cart.items.find(
      (item) =>
        item.userId === newItem.userId && item.product.id === newItem.product.id
    )
      ? true
      : false;
  };

  return (
    <AppContext.Provider
      value={{
        users,
        setUsers,
        bin,
        setBin,
        cart,
        addToCart,
        removeFromCart,
        setCart,
        inCart,
        round,
        curUser,setCurUser
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
