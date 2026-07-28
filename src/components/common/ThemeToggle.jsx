import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

/* ─── tiny star/sparkle shapes ─── */
const Ray = ({ angle, delay }) => (
  <motion.div
    style={{ position: "absolute", top: "50%", left: "50%", transformOrigin: "0 0" }}
    initial={{ scaleX: 0, opacity: 0, rotate: angle }}
    animate={{ scaleX: 1, opacity: 1, rotate: angle }}
    exit={{ scaleX: 0, opacity: 0, rotate: angle }}
    transition={{ duration: 0.4, delay }}
  >
    <div
      style={{
        width: 10,
        height: 2,
        borderRadius: 1,
        background: "#C8997E",
        marginLeft: 16,
        marginTop: -1,
      }}
    />
  </motion.div>
);

const Star = ({ style, delay }) => (
  <motion.div
    style={{ position: "absolute", borderRadius: "50%", background: "#FFE8D6", ...style }}
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 0.8 }}
    exit={{ scale: 0, opacity: 0 }}
    transition={{ duration: 0.3, delay }}
  />
);

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "light";

  const SUN_RAYS = [0, 45, 90, 135, 180, 225, 270, 315];

  return (
    <motion.button
      id="theme-toggle-btn"
      onClick={toggleTheme}
      aria-label={isLight ? "Switch to Night Mode" : "Switch to Day Mode"}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      style={{
        position: "fixed",
        bottom: 28,
        right: 28,
        zIndex: 9999,
        width: 56,
        height: 56,
        borderRadius: "50%",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "visible",
        background: isLight
          ? "linear-gradient(135deg, #4E2E1E, #D4A882)"
          : "linear-gradient(135deg, #2c2e25, #343629)",
        boxShadow: isLight
          ? "0 0 0 1px rgba(212,168,130,0.4), 0 8px 32px rgba(61,35,24,0.6)"
          : "0 0 0 1px rgba(183,183,164,0.15), 0 8px 32px rgba(44,46,37,0.6)",
        transition: "background 0.5s ease, box-shadow 0.5s ease",
      }}
    >
      {/* Glow ring */}
      <motion.div
        animate={{
          boxShadow: isLight
            ? "0 0 20px 4px rgba(200,153,126,0.4)"
            : "0 0 14px 2px rgba(107,112,92,0.25)",
        }}
        transition={{ duration: 0.5 }}
        style={{
          position: "absolute",
          inset: -2,
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />

      {/* The track pill — visual Day/Night label */}
      <motion.div
        style={{
          position: "absolute",
          bottom: -36,
          left: "50%",
          transform: "translateX(-50%)",
          whiteSpace: "nowrap",
          fontSize: 9,
          fontWeight: 900,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          fontFamily: "Plus Jakarta Sans, sans-serif",
          color: isLight ? "#6B705C" : "#B7B7A4",
          transition: "color 0.4s ease",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        {isLight ? "Day Mode" : "Night Mode"}
      </motion.div>

      {/* Icon swap */}
      <div style={{ position: "relative", width: 28, height: 28 }}>
        <AnimatePresence mode="wait">
          {isLight ? (
            /* ──── SUN ──── */
            <motion.div
              key="sun"
              initial={{ rotate: -90, scale: 0, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              {/* Sun core */}
              <div
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  background: "#C8997E",
                  boxShadow: "0 0 8px rgba(200,153,126,0.8)",
                }}
              />
              {/* Rays */}
              {SUN_RAYS.map((angle, i) => (
                <Ray key={angle} angle={angle} delay={i * 0.03} />
              ))}
            </motion.div>
          ) : (
            /* ──── MOON ──── */
            <motion.div
              key="moon"
              initial={{ rotate: 90, scale: 0, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: -90, scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              {/* Moon crescent via clip */}
              <div style={{ position: "relative", width: 18, height: 18 }}>
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "50%",
                    background: "#FFE8D6",
                    boxShadow: "0 0 8px rgba(255,232,214,0.5)",
                  }}
                />
                {/* Overlay circle to create crescent */}
                <div
                  style={{
                    position: "absolute",
                    top: -3,
                    right: -3,
                    width: 14,
                    height: 14,
                    borderRadius: "50%",
                    background: "#2c2e25",
                  }}
                />
              </div>
              {/* Stars */}
              <Star style={{ width: 3, height: 3, top: 0, right: 0 }} delay={0.1} />
              <Star style={{ width: 2, height: 2, top: 4, right: -6 }} delay={0.15} />
              <Star style={{ width: 2, height: 2, bottom: 2, right: -4 }} delay={0.2} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.button>
  );
};

export default ThemeToggle;