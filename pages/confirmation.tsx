import { ChildCart } from "../components/Cart/ChildCart";
import { useAppContext } from "../context/AppContext";

const Confirmation = () => {
  const { users, cart} = useAppContext();
  return (
    <div id="mainDiv">
      <h2 id="mainH">Done! Your order is confirmed</h2>
      <h3>Here is an overview of your items :</h3>
      {users?.map((user) => (
        <div key={user.id} id='minCart'>
          <ChildCart user={user} />
        </div>
      ))}
      <h2 id="mainH">Your total is {cart?.total}$</h2>
      <h3>Here is an overview of your <b>ignored</b> items :</h3>
      {users?.map((user) => (
        <div key={user.id} id='minCart'>
          <ChildCart user={user} ignore={true}/>
        </div>
      ))}
    </div>
  );
};

export default Confirmation;
