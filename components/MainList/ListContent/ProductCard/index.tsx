import { CartItem} from "../../../../utils/types";
import styles from "./ProductCard.module.css";
import { useAppContext } from "../../../../context/AppContext";
import { useState } from "react";
import Image from "next/image";

export const ProductCard = (props: {
  item: CartItem;
}) => {
  const {addToCart, inCart,removeFromCart,round } = useAppContext();
  const [toggleDesc, setToggleDesc] = useState(false);
  const { item} = props;
  const total = round?round((parseFloat(item.product.price) * item.count)):undefined;
  const add = async() => {
    if (addToCart) addToCart(item);
  };
  const remove = () => {
    if (removeFromCart) removeFromCart(item);
  };
  return (
    <div className={styles.card}>
      <div className={styles.leftDiv}>
        <h4>{item.product.title}</h4>
        <h6>{item.product.category}</h6>
        <button
          className={styles.toggle}
          onClick={() => setToggleDesc(!toggleDesc)}
        >
          <p>Description {toggleDesc ? "X" : ">>"}</p>
        </button>
        <p style={toggleDesc ? {} : { visibility: "collapse", opacity: 0 }}>
          {item.product.description}
        </p>
        <div className={styles.buttonDiv}>
          {inCart && inCart(item) ? (<>
            <button className={styles.added}>Added To Cart</button>
            <button onClick={()=>remove()} className={styles.remove}>Remove</button>
          </>

          ) : (
            <button onClick={()=>add()} className={styles.add}>Add To Cart</button>
          )}
        </div>
      </div>
      <div className={styles.rightDiv}>
        <div className={styles.imgContainer}>
          <Image
            src={item.product.image}
            alt={item.product.title}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
        </div>
        <h5>{item.product.price} $</h5>
        <h5>{item.count} of this product</h5>
        <h4 style={{ fontWeight: 500 }}>Total: {total} $</h4>
      </div>
    </div>
  );
};
