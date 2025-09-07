function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 border-t border-gray-700 mt-12">
      <div className="container mx-auto py-8 px-6 text-center text-gray-400">
        {/* Branding & Info */}
        <h2 className="text-lg font-semibold text-white tracking-wide">
          RusmbaShop
        </h2>
        <p className="mt-2 text-sm">
          Solusi belanja online yang modern, cepat, dan terpercaya.
        </p>

        {/* Links */}
        <div className="mt-4 flex justify-center space-x-8 text-sm">
          <a href="#" className="hover:text-blue-400 transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-blue-400 transition-colors">
            Terms of Service
          </a>
          <a href="#" className="hover:text-blue-400 transition-colors">
            Contact Us
          </a>
        </div>

        {/* Divider */}
        <div className="mt-6 border-t border-gray-500"></div>

        {/* Copyright & Credit */}
        <div className="mt-4 text-xs text-gray-100">
          <p>&copy; {currentYear} RusmbaShop. All rights reserved.</p>
          <p className="mt-1">
            Website ini dikembangkan oleh{" "}
            <span className="text-blue-400 font-medium">Nabil</span>, dibantu
            IBM Granite dalam rangka{" "}
            <span className="italic">
              Capstone Project Student Development Initiative IBM X Hacktiv8
            </span>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
