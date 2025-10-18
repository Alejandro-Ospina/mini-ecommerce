import { useState } from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Detail from "./pages/Details";
import { ProductProvider } from "./context/ProductContext";
import { CartProvider } from "./context/CartContext";
import CartSidebar from "./components/CartSidebar";
import AddProduct from "./pages/AddProduct";

function App() {
  const [isCartOpen, setCartOpen] = useState(false);

  return (
    <CartProvider>
      <ProductProvider>
        <HashRouter>
          <div className="relative flex flex-col min-h-screen bg-gray-50">
            {/* Fondo difuminado cuando el carrito está abierto */}
            <div className={`${isCartOpen ? "blur-sm pointer-events-none" : ""} flex flex-col flex-grow`}>
              <Navbar onCartClick={() => setCartOpen(true)} />

              {/* Contenido principal con scroll */}
              <main className="flex-grow overflow-y-auto pt-24 pb-24 px-4 container mx-auto">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/category/:categoryName" element={<Home />} />
                  <Route path="/detalle/:id" element={<Detail />} />
                  <Route path="/add-product" element={<AddProduct />} /> {/* ruta nueva */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
            </div>

            {/* Footer fijo */}
            <Footer className="fixed bottom-0 left-0 w-full z-40" />

            {/* Sidebar del carrito */}
            <CartSidebar isOpen={isCartOpen} onClose={() => setCartOpen(false)} />
          </div>
        </HashRouter>
      </ProductProvider>
    </CartProvider>
  );
}

export default App;

