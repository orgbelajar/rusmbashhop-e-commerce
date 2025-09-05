function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 border-t border-gray-700 mt-12">
      <div className="container mx-auto py-6 px-4 text-center text-gray-400">
        <p>
          &copy; {currentYear} RusmbaStore. Dibuat dengan bantuan AI untuk Capstone Project Student Development Initiative IBM X Hacktiv8.
        </p>
        <div className="mt-4 flex justify-center space-x-6">
          <a href="#" className="hover:text-white transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Terms of Service
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
