import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"
import Home from "./pages/Home/Home"
import Layout from "./comonents/Layout/Layout"
import { Toaster } from "react-hot-toast"
import Protectedroutes from "./comonents/Protectedroutes/Protectedroutes"
import Guardroute from "./comonents/Guardroute/Guardroute"
import TokenProvider from "./context/Token.context"
import CartProvider from "./context/Cart.context"
import Cart from "./pages/Cart/Cart"
import Brands from './pages/Brands/Brands';
import Category from './pages/Category/Category';
import Productdetails from "./pages/Productdetails/Productdetails"
import Checkout from "./pages/Checkout/Checkout"
import Online from "./comonents/Online/Online"
import Offline from "./comonents/Offline/Offline"
import Wishlist from "./pages/Wishlist/Wishlist"
import WishlistProvider from "./context/Wishlist.context"
import Products from "./pages/Products/Products"

const routes = createBrowserRouter([
  {
    path: '', element: <Protectedroutes><Layout /></Protectedroutes>, children: [
      { path: 'home', element: <Home /> },
      { path: '', element: <Home /> },
      { path: 'brands', element: <Brands /> },
      { path: 'categories', element: <Category /> },
      { path: 'products', element: <Products /> },
      { path: 'product/:id', element: <Productdetails /> },
      { path: 'cart', element: <Cart /> },
      { path: 'checkout', element: <Checkout /> },
      { path: 'wishlist', element: <Wishlist /> },

    ]
  },
  {
    path: '', element: <Guardroute><Layout /></Guardroute>, children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },


    ]
  },

])
function App() {

  return (
    <>
      <Online>
        <TokenProvider>
          <CartProvider>
            <WishlistProvider>

              <RouterProvider router={routes}></RouterProvider>
              <Toaster />
            </WishlistProvider>

          </CartProvider>
        </TokenProvider>
      </Online>

      <Offline>

        <h2>Offline</h2>

      </Offline>

    </>
  )
}

export default App
