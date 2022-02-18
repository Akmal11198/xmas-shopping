import { useEffect, useState } from "react";
import { useAppContext } from "../../../context/AppContext";
import { CartItem, User } from "../../../utils/types";
import styles from "./ChildCart.module.css";
export const ChildCart = (props: { user: User; ignore?: boolean }) => {
  const { user, ignore } = props;
  const { cart, round, bin } = useAppContext();
  const [userCart, setUserCart] = useState(null as unknown as CartItem[]);
  useEffect(() => {
    if (userCart) {
      fetch(`https://fakestoreapi.com/carts`, {
        method: "POST",
        body: JSON.stringify({
          userId: user.id,
          date: Date.now(),
          products: userCart.map((item) => ({
            productId: item.product.id,
            quantity: item.count
          })),
        }),
      });
    } else {
      const boughtItems = cart?.items?.filter(
        (item) => item.userId === user.id
      );
      if (ignore) {
        const allItems = bin?.filter((item) => item.userId === user.id);
        if (allItems) {
          if (boughtItems && boughtItems.length > 0) {
            let ignored: CartItem[] = [];
            for (let i of allItems) {
              let found = false;
              for (let c of boughtItems) {
                if (i.product.id === c.product.id) {
                  found = true;
                  break;
                }
              }
              if (!found) ignored.push(i);
            }
            setUserCart(ignored);
          } else setUserCart(allItems);
        }
      } else {
        setUserCart(boughtItems!);
      }
    }
  }, [userCart]);

  let total = 0;
  return (
    <>
      <h3>
        {user.name.firstname + " " + user.name.lastname}'s{" "}
        {ignore ? "ignored items" : "Cart"}
      </h3>
      {userCart && userCart.length > 0 ? (
        <>
          <ul className={styles.separator}>
            {userCart.map((item, index) => {
              total += round
                ? round(item.count * parseFloat(item.product.price))
                : 0;
              return (
                <li key={index}>
                  {item.product.title}{" "}
                  <b>
                    X{item.count} {item.sale && "DISCOUNT"}
                  </b>
                </li>
              );
            })}
          </ul>
          {!ignore && (
            <h6>
              {user.name.firstname}'s total: {total}$
            </h6>
          )}
        </>
      ) : (
        <h6>No Items</h6>
      )}
    </>
  );
};
