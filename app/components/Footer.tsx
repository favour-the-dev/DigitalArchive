function Footer() {
  const currentDate = new Date().getFullYear();
  return (
    <footer className="w-full bg-brightPurple/70 text-white text-center p-3">
      <p className="wrapper">
        &copy; {currentDate} Digital Archive. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
