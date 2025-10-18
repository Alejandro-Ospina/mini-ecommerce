import logo from "../assets/logo.jpg";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

interface NavbarProps {
  onCartClick?: () => void; // función opcional al hacer click en carrito
}

const categories = [
  "Electrodomésticos",
  "Tecnología",
  "Ropa Mujer",
  "Ropa Hombre",
  "Ropa Niños(as)",
  "Juguetes",
];

const Navbar: React.FC<NavbarProps> = ({ onCartClick }) => {
  const { cart } = useCart();
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-red-700 to-red-500 shadow-md">
      <nav className="container mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo + nombre */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src={logo}
            alt="logo"
            className="h-10 w-10 rounded-md object-contain bg-white p-1"
          />
          <h1 className="font-bold text-xl text-white tracking-wide">Tiendas Spring</h1>
        </Link>

        {/* Categorías */}
        <ul className="hidden lg:flex items-center gap-4">
          {categories.map((c) => (
            <li key={c}>
              <button
                className="text-white font-medium px-3 py-2 rounded-md transition-all hover:bg-white hover:text-red-600 hover:shadow"
                onClick={() => navigate(`/category/${c}`)}
              >
                {c}
              </button>
            </li>
          ))}
        </ul>

        {/* Carrito */}
        <button
          onClick={onCartClick}
          className="relative bg-white text-red-600 font-bold px-3 py-2 rounded-md hover:bg-red-100 transition-all"
        >
          🛒
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-yellow-400 text-xs text-black rounded-full px-1">
              {cart.length}
            </span>
          )}
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
