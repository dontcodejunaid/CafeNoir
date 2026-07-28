import { motion } from "framer-motion";
import { ArrowRight, Plus } from "lucide-react";
import GlassCard from "../ui/GlassCard";
import { formatPrice } from "../../utils/helpers";
import { useCart } from "../../context/CartContext";
import { menuData } from "../../data/menuData";

const mustTryIds = [101, 4, 402, 202, 302, 505];

const MustTry = () => {
  const { addToCart, cartItems, updateQuantity } = useCart();

  const getItemQuantity = (itemId) =>
    cartItems.find((cartItem) => cartItem.id === itemId)?.quantity ?? 0;

  const mustTryItems = mustTryIds
    .map((itemId) => menuData.find((item) => item.id === itemId))
    .filter(Boolean);

  return (
    <section className="mb-16 rounded-[2.5rem] border border-white/10 bg-white/[0.02] p-8 md:p-10">
      <div className="flex items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 text-primary text-[10px] font-bold uppercase tracking-[0.4em] mb-3">
            <span className="w-2 h-2 rounded-full bg-primary" /> Chef's Picks
          </div>
          <h3 className="text-3xl font-serif text-white">Must Try</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {mustTryItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
          >
            <GlassCard className="overflow-hidden p-0 border-white/5 hover:border-primary/20 transition-all duration-500 h-full">
              <div className="relative h-52 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
              </div>
              <div className="p-5 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <h4 className="text-white font-serif text-xl leading-tight">{item.name}</h4>
                  <span className="text-primary font-serif italic text-lg">{formatPrice(item.price)}</span>
                </div>

                {getItemQuantity(item.id) > 0 && (
                  <p className="text-[10px] uppercase tracking-widest text-primary">
                    In Cart: {getItemQuantity(item.id)}
                  </p>
                )}

                <div className="flex items-center gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, getItemQuantity(item.id) - 1)}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-colors hover:border-primary/30 hover:bg-white/10"
                    aria-label={`Decrease quantity of ${item.name}`}
                  >
                    -
                  </button>

                  <button
                    type="button"
                    onClick={() => addToCart(item)}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-3 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-primary-dark"
                  >
                    <Plus size={14} /> {getItemQuantity(item.id) > 0 ? "Add More" : "Add to Cart"}
                  </button>

                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, getItemQuantity(item.id) + 1)}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-colors hover:border-primary/30 hover:bg-white/10"
                    aria-label={`Increase quantity of ${item.name}`}
                  >
                    +
                  </button>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default MustTry;