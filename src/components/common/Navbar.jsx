import React, { createContext, useState, useEffect } from "react";
import { MessageCircle, Menu, X, Sparkles } from "lucide-react";
import { NavLink } from "react-router-dom";
import { getRestaurantStatus } from "../../utils/helpers";
import { motion, AnimatePresence } from "framer-motion";

export const MobileMenuContext = createContext({
  showMenu: false,
  setShowMenu: () => {},
});

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { status } = getRestaurantStatus();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openWhatsApp = () => {
    const phoneNumber = "919945505665";
    const msg = "Hello CAFENOIR! I have an enquiry regarding my visit.";
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/menu" },
    { name: "Reservation", path: "/reservation" },
    { name: "Order", path: "/order" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <MobileMenuContext.Provider value={{ showMenu, setShowMenu }}>
      <header 
        className={`fixed w-full top-0 inset-x-0 z-50 transition-all duration-500 border-b ${
          scrolled 
            ? "bg-bg-main/90 backdrop-blur-2xl border-primary/30 shadow-[0_10px_35px_rgba(0,0,0,0.4)] py-3" 
            : "bg-bg-main/60 backdrop-blur-md border-primary/15 py-4"
        }`}
      >
        {/* Top Decorative Gold Hairline (Classic Bistro Accent) */}
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Left: Classic Bistro Brand Logo */}
          <NavLink to="/" className="flex items-center gap-3.5 group">
            <div className="relative p-0.5 rounded-full border border-primary/40 group-hover:border-primary transition-colors duration-300">
              <img
                src="/cafenoir-logo.png"
                alt="CafeNoir Logo"
                className="w-10 h-10 rounded-full object-cover"
                style={{ filter: 'drop-shadow(0 0 8px rgba(200,153,126,0.3))' }}
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-black text-2xl tracking-widest text-text-base leading-none">
                CAFE<span className="text-primary italic font-serif">NOIR</span>
              </span>
              <span className="text-[8px] font-serif uppercase tracking-[0.35em] text-primary/70 mt-1">
                Café & Bistro • Ramanagara
              </span>
            </div>
          </NavLink>

          {/* Center: French Bistro Serif Navigation */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-10 font-serif text-xs uppercase tracking-[0.25em]">
            {navLinks.map((link, idx) => (
              <React.Fragment key={link.path}>
                <NavLink 
                  to={link.path} 
                  className={({ isActive }) => 
                    `relative py-1.5 transition-colors duration-300 ${
                      isActive ? "text-primary font-bold" : "text-text-muted hover:text-text-base"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span>{link.name}</span>
                      {isActive && (
                        <motion.div 
                          layoutId="bistroNavUnderline" 
                          className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-primary"
                          transition={{ type: "spring", stiffness: 350, damping: 28 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>

                {/* Subtle ornamental diamond bullet between links */}
                {idx < navLinks.length - 1 && (
                  <span className="text-[8px] text-primary/40 select-none font-sans">✦</span>
                )}
              </React.Fragment>
            ))}
          </nav>

          {/* Right: Bistro Actions & Status */}
          <div className="flex items-center gap-5">
            
            {/* Bistro Hours / Live Status */}
            <div className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/25 bg-primary/5 text-primary text-[9px] font-serif uppercase tracking-[0.2em]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span>{status}</span>
            </div>

            {/* Classic Gold-Bordered Enquiry Button */}
            <button
              onClick={openWhatsApp}
              className="hidden sm:inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-primary text-primary hover:bg-primary hover:text-cream text-[10px] font-bold uppercase tracking-[0.25em] transition-all duration-300 shadow-[0_0_15px_rgba(200,153,126,0.15)] hover:shadow-[0_0_25px_rgba(200,153,126,0.35)] active:scale-95"
            >
              <MessageCircle size={13} />
              <span>Enquiry</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="md:hidden p-2.5 rounded-full border border-primary/30 text-text-base hover:text-primary transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {showMenu ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Bottom Hairline Accent */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-primary/10" />

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {showMenu && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-bg-main/98 backdrop-blur-2xl border-b border-primary/30 px-6 py-8 space-y-6 overflow-hidden"
            >
              <div className="flex flex-col gap-4 font-serif text-sm uppercase tracking-[0.25em] text-center">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={() => setShowMenu(false)}
                    className={({ isActive }) =>
                      `py-3 rounded-xl transition-all border ${
                        isActive 
                          ? "border-primary/40 text-primary bg-primary/10" 
                          : "border-transparent text-text-muted hover:text-text-base"
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}
              </div>

              <div className="pt-6 border-t border-primary/20 flex flex-col gap-4 items-center text-center">
                <div className="flex items-center justify-center gap-2 text-[10px] font-serif uppercase tracking-[0.2em] text-primary">
                  <Sparkles size={12} />
                  <span>Kitchen Status • {status}</span>
                  <Sparkles size={12} />
                </div>
                <button
                  onClick={() => {
                    setShowMenu(false);
                    openWhatsApp();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-full border border-primary bg-primary text-cream text-xs font-bold uppercase tracking-[0.2em]"
                >
                  <MessageCircle size={15} />
                  <span>WhatsApp Enquiry</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </MobileMenuContext.Provider>
  );
};

export default Navbar;
