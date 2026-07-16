import Header from "./components/Header.jsx";
import Meals from "./components/Meals.jsx";
import {CartContextProvider} from "./store/CartContext.jsx";
import UserActivationContextProvider from "./store/UserProgressContext.jsx";
import Cart from "./components/Cart.jsx";

function App() {
  return (
    <>
  <UserActivationContextProvider>
      <CartContextProvider>
        
        <Header />
        <Meals />
        <Cart />
      </CartContextProvider>
    </UserActivationContextProvider>
    </>
  );
}

export default App;
