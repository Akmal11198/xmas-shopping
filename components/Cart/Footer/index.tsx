import Link from "next/link"
import { useAppContext } from "../../../context/AppContext"
import styles from "./Footer.module.css"
export const Footer=()=>{
    const{cart}=useAppContext()
    return(
        <div className={styles.footer}>
            <div className={styles.price}>
            <p>Total: {cart?.total} $</p>
            </div>
            <Link href={"/confirmation"} passHref>
            <button>Confirm Cart</button>
            </Link>
        </div>
    )
}