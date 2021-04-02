import { createContext, useState } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import './App.css';
import AddBook from "./components/AddBook/AddBook";
import Admin from "./components/Admin/Admin";
import Cart from "./components/Cart/Cart";
import EditBooks from "./components/EditBooks/EditBooks";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Managebooks from "./components/ManageBooks/Managebooks";
import Orders from "./components/Orders/Orders";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import SignUp from "./components/SignUp/SignUp";
import OrderDetails from './components/OrderDetails/OrderDetails'
import Navbars from "./components/NavBar/Navbar";
import EditById from "./components/EditByID/EditById";

export const CartContext = createContext();
export const UserContext = createContext();
function App() {
  const [cartItems, setCartItems] = useState([])
  const [loggedInUser, setLoggedInUser] = useState({})
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Switch>
          <div className="App">
            <CartContext.Provider value={[cartItems, setCartItems]}>
              <Route path='/' exact>

                <Home />

              </Route>
              <PrivateRoute path='/checkout/add/:id'>
                <Navbars />
                <Cart />
              </PrivateRoute>
              <PrivateRoute path='/checkout' exact>
                <Cart />
              </PrivateRoute>
            </CartContext.Provider>
            <PrivateRoute path='/admin' exact>
              <Admin />
            </PrivateRoute>
            <PrivateRoute path="/admin/manageBooks">
              <Managebooks />
            </PrivateRoute>
            <PrivateRoute path='/admin/addBooks'>
              <AddBook />
            </PrivateRoute>
            <PrivateRoute path='/admin/editBooks' exact>
              <EditBooks />
            </PrivateRoute>
            <Route path='/login'>
              <Login />
            </Route>
            <PrivateRoute path='/orders' exact>
              <Orders />
            </PrivateRoute>
            <PrivateRoute path='/orders/details/:id'>
              <OrderDetails />
            </PrivateRoute>
            <Route path='/signup'>
              <SignUp />
            </Route>
            <Route path='/admin/editBooks/:id'>
              <EditById />
            </Route>
          </div>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
