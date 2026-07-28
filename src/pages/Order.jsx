import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, CreditCard, Truck, ChevronRight, Trash2, Plus, Minus, ArrowLeft } from "lucide-react";
import { formatPrice } from "../utils/helpers";
import GlassCard from "../components/ui/GlassCard";
import { fadeIn, staggerContainer } from "../utils/animations";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Order = () => {
  const { cartItems, updateQuantity, removeFromCart, toggleCustomization } = useCart();
  const isEmpty = cartItems.length === 0;
  const customizationPrice = 120;
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const customizationTotal = cartItems.reduce(
    (total, item) => total + (item.customizations?.length || 0) * customizationPrice * item.quantity,
    0
  );
  const gst = subtotal * 0.18;
  const totalAmount = subtotal + customizationTotal + gst;
  const customizationOptions = ["Special Ketchup", "Special Mustard"];

  const getItemTotal = (item) =>
    item.price * item.quantity + (item.customizations?.length || 0) * customizationPrice * item.quantity;

  const steps = [
    { id: 1, name: "Cart", icon: <ShoppingBag size={14} />, active: true },
    { id: 2, name: "Details", icon: <Truck size={14} />, active: false },
    { id: 3, name: "Payment", icon: <CreditCard size={14} />, active: false },
  ];

  return (
    <div className="pt-32 pb-20 bg-bg-main min-h-screen relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        
        {/* Progress Stepper */}
        <div className="flex justify-center mb-16">
          <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-6 py-3 rounded-full">
            {steps.map((step, idx) => (
              <div key={step.id} className="flex items-center gap-3">
                <div className={`flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest ${step.active ? "text-primary" : "text-slate-600"}`}>
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center border ${step.active ? "border-primary bg-primary/10" : "border-slate-800"}`}>
                    {step.id}
                  </span>
                  {step.name}
                </div>
                {idx !== steps.length - 1 && <ChevronRight size={14} className="text-slate-800" />}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* Left Column: Cart Items */}
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="lg:col-span-2 space-y-6"
          >
            <div className="flex justify-between items-end border-b border-white/5 pb-6">
              <h2 className="text-4xl font-serif text-white">Your Selection</h2>
              <span className="text-slate-500 text-sm font-bold uppercase tracking-widest">
                {cartItems.length} Items
              </span>
            </div>

            <AnimatePresence mode="popLayout">
              {isEmpty ? (
                <motion.div 
                  variants={fadeIn("up", 0.2)}
                  className="py-20 text-center"
                >
                  <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/5 text-slate-700">
                    <ShoppingBag size={40} />
                  </div>
                  <h3 className="text-xl text-white font-serif mb-4">Your gallery is empty</h3>
                  <p className="text-slate-500 mb-8 max-w-xs mx-auto">Looks like you haven't added any delicacies to your order yet.</p>
                  <Link to="/menu">
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-3 bg-primary text-white rounded-full text-xs font-bold uppercase tracking-widest shadow-lg shadow-primary/20"
                    >
                      Return to Menu
                    </motion.button>
                  </Link>
                </motion.div>
              ) : (
                cartItems.map((item) => (
                  <motion.div key={item.id} layout variants={fadeIn("up", 0.1)}>
                    <GlassCard className="p-4 flex gap-6 items-center group">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 rounded-2xl object-cover border border-white/10"
                      />
                      <div className="flex-1">
                        <p className="text-primary text-[10px] font-bold tracking-widest uppercase mb-1">{item.category}</p>
                        <h4 className="text-white font-serif text-2xl mb-2">{item.name}</h4>
                        <p className="text-slate-400 text-sm mb-4 line-clamp-2">{item.description}</p>
                        <div className="mb-4 space-y-2">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Customization</p>
                          <div className="flex flex-wrap gap-2">
                            {customizationOptions.map((option) => {
                              const isSelected = item.customizations?.includes(option);

                              return (
                                <button
                                  key={option}
                                  type="button"
                                  onClick={() => toggleCustomization(item.id, option)}
                                  className={`rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest transition-colors ${
                                    isSelected
                                      ? "border-primary bg-primary/15 text-primary"
                                      : "border-white/10 bg-white/5 text-slate-400 hover:border-primary/30 hover:text-white"
                                  }`}
                                >
                                  {option}
                                </button>
                              );
                            })}
                          </div>
                          {item.customizations?.length > 0 && (
                            <p className="text-[10px] text-slate-500">
                              Added: {item.customizations.join(", ")}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-white font-bold">{formatPrice(getItemTotal(item))}</span>
                          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="text-slate-300 hover:text-white"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="min-w-6 text-center text-sm font-bold text-white">{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="text-slate-300 hover:text-white"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            className="flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-red-400 hover:text-red-300"
                          >
                            <Trash2 size={14} /> Remove
                          </button>
                        </div>
                      </div>
                    </GlassCard>
                  </motion.div>
                ))
              )}
            </AnimatePresence>

          </motion.div>

          {/* Right Column: Summary */}
          <motion.div 
            variants={fadeIn("left", 0.3)}
            initial="initial"
            animate="animate"
            className="h-fit"
          >
            <GlassCard className="p-8 space-y-8 border-primary/10">
              <div className="space-y-4">
                <h3 className="text-white font-serif text-2xl tracking-wide">Summary</h3>
                <div className="w-12 h-1 bg-primary rounded-full" />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 uppercase tracking-widest font-bold">Subtotal</span>
                  <span className="text-white font-medium">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 uppercase tracking-widest font-bold">Customization</span>
                  <span className="text-white font-medium">{formatPrice(customizationTotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 uppercase tracking-widest font-bold">Delivery Fee</span>
                  <span className="text-emerald-500 font-bold tracking-tighter uppercase">Free</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-slate-500 uppercase tracking-widest font-bold">Taxes (GST 18%)</span>
                    <span className="text-white font-medium">{formatPrice(gst)}</span>
                </div>
                
                <div className="h-px bg-white/10 my-6" />
                
                <div className="flex justify-between items-end">
                  <span className="text-white font-serif text-lg">Total Amount</span>
                  <span className="text-3xl text-primary font-serif italic">{formatPrice(totalAmount)}</span>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <motion.button 
                  disabled={isEmpty}
                  whileHover={!isEmpty ? { scale: 1.02, backgroundColor: "#6366f1" } : {}}
                  whileTap={!isEmpty ? { scale: 0.98 } : {}}
                  className={`w-full py-5 rounded-2xl font-bold uppercase tracking-widest flex items-center justify-center gap-3 transition-all shadow-xl shadow-primary/10 ${
                    isEmpty ? "bg-white/5 text-slate-700 cursor-not-allowed" : "bg-primary text-white"
                  }`}
                >
                  Proceed to Payment <ChevronRight size={18} />
                </motion.button>
                
                <p className="text-[10px] text-center text-slate-600 uppercase tracking-[0.2em] font-bold">
                    Secure 256-bit SSL Payment
                </p>
              </div>
            </GlassCard>

            {/* Back Link */}
            <Link to="/menu" className="flex items-center justify-center gap-2 mt-8 text-slate-500 hover:text-primary transition-colors text-xs font-bold uppercase tracking-widest group">
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Continue Browsing
            </Link>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Order;