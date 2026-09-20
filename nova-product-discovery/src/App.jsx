import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ShopProvider } from "./context/ShopContext";

import Navbar from "./components/Navbar/Navbar";

import Home from "./pages/Home/Home";
import Categories from "./pages/Categories/Categories";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Cart from "./pages/Cart/Cart";
import Favorites from "./pages/Favorites/Favorites";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <ShopProvider>
        <div className="app">
          <Navbar />

          <main>
            <Routes>
              {/* Home */}
              <Route
                path="/"
                element={<Home />}
              />

              {/* Categories */}
              <Route
                path="/categories"
                element={<Categories />}
              />

              {/* Product Details */}
              <Route
                path="/product/:id"
                element={<ProductDetails />}
              />

              {/* Cart */}
              <Route
                path="/cart"
                element={<Cart />}
              />

              {/* Favorites */}
              <Route
                path="/favorites"
                element={<Favorites />}
              />
            </Routes>
          </main>
        </div>
      </ShopProvider>
    </BrowserRouter>
  );
}

export default App;
