function Footer() {
  return (
    <>
      <footer className="bg-white shadow">
        <div className="w-full mx-auto p-4 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">
          <span>
            © {new Date().getFullYear()}  WAISL Admin Portal. All Rights
            Reserved.
          </span>
        </div>
      </footer>
    </>
  );
}

export default Footer;
