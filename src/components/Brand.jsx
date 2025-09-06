import { Link } from "react-router-dom";

export default function Brand({ className = "" }) {
  return (
    <Link
      to="/"
      className={`text-2xl font-bold text-orange-500 hover:text-orange-400 transition-colors ${className}`}
    >
      RusmbaShop
    </Link>
  );
}
