import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

// Komponen ini menerima props standar untuk input (value, onChange)
function PasswordInput({ value, onChange }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="relative">
      <input
        id="password"
        type={isPasswordVisible ? "text" : "password"}
        value={value}
        onChange={onChange}
        required
        className="w-full px-3 py-2 pr-10 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
        placeholder="••••••••"
      />
      <button
        type="button" // Penting agar tidak men-submit form
        onClick={togglePasswordVisibility}
        className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-gray-200"
        aria-label="Toggle password visibility"
      >
        <FontAwesomeIcon icon={isPasswordVisible ? faEyeSlash : faEye} />
      </button>
    </div>
  );
}

export default PasswordInput;
