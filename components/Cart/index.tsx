import { useAppContext } from "../../context/AppContext";
import styles from "./Cart.module.css";
import { ChildCart } from "./ChildCart";
import { Footer } from "./Footer";
export const Cart = () => {
    const{users}=useAppContext();
  return (
    <div id="column" className={styles.mainDiv}>
      <h3 className={styles.cartH}>Your Cart</h3>
      {users?.map((user)=>(
          <div key={user.id} id='minCart'>
              <ChildCart user={user}/>
          </div>
      ))}
      <Footer />
    </div>
  );
};
