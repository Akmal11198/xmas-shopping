import { useAppContext } from "../../../context/AppContext";
import { User } from "../../../utils/types";
import styles from "./ListToggle.module.css";
export const ListToggle = () => {
    const {users,curUser,setCurUser}=useAppContext();
  return (
    <div className={styles.sidebar}>
      {users?.map((u: User, index: number) => (
        <button
          onClick={() => setCurUser?setCurUser(index):null}
          key={index}
          id="button"
          className={index === curUser! ? styles.active : styles.toggle}
        >{`${u.name.firstname}'s List`}</button>
      ))}
    </div>
  );
};
