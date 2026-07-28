import { createContext, useContext, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
	const [cartItems, setCartItems] = useLocalStorage("cafenova-cart", []);

	const addToCart = (item) => {
		setCartItems((currentItems) => {
			const existingItem = currentItems.find((cartItem) => cartItem.id === item.id);

			if (existingItem) {
				return currentItems.map((cartItem) =>
					cartItem.id === item.id
						? { ...cartItem, quantity: cartItem.quantity + 1 }
						: cartItem
				);
			}

			return [...currentItems, { ...item, quantity: 1, customizations: [] }];
		});
	};

	const removeFromCart = (id) => {
		setCartItems((currentItems) => currentItems.filter((item) => item.id !== id));
	};

	const updateQuantity = (id, quantity) => {
		if (quantity <= 0) {
			removeFromCart(id);
			return;
		}

		setCartItems((currentItems) =>
			currentItems.map((item) =>
				item.id === id ? { ...item, quantity } : item
			)
		);
	};

	const toggleCustomization = (id, customization) => {
		setCartItems((currentItems) =>
			currentItems.map((item) => {
				if (item.id !== id) {
					return item;
				}

				const customizations = item.customizations || [];
				const hasCustomization = customizations.includes(customization);

				return {
					...item,
					customizations: hasCustomization
						? customizations.filter((option) => option !== customization)
						: [...customizations, customization],
				};
			})
		);
	};

	const clearCart = () => setCartItems([]);

	const value = useMemo(
		() => ({
			cartItems,
			addToCart,
			removeFromCart,
			updateQuantity,
			toggleCustomization,
			clearCart,
		}),
		[cartItems]
	);

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
	const context = useContext(CartContext);

	if (!context) {
		throw new Error("useCart must be used within a CartProvider");
	}

	return context;
};
