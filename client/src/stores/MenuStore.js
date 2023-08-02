import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

const MenuStore = (set, get) => ({
  cart: [],
  date: null,
  cartQuantity: 0,
  subtotal: 0,
  isEmpty: true,
  error: "",
  setDate: (input) => {
    set({ date: input }, false, "Date updated");
  },
  clearDate: () => {
    set({ date: null }, false, "Date cleared");
  },
  updateOrder: async (ID, NAME, QUANTITY, BASEPRICE, PRICE, IMGLINK) => {
    const newItem = {
      id: ID,
      name: NAME,
      quantity: QUANTITY,
      basePrice: BASEPRICE,
      price: PRICE,
      img: IMGLINK,
    };
    try {
      let wasFound = false;
      get().cart.forEach((item) => {
        if (newItem.id === item.id) {
          wasFound = true;

          set(
            (state) => ({
              cart: state.cart.map((order) =>
                order.id === newItem.id
                  ? {
                      ...order,
                      quantity: order.quantity + newItem.quantity,
                      price: order.price + newItem.price,
                    }
                  : order
              ),
            }),
            false,
            "Order updated"
          );

          set(
            { subtotal: get().subtotal + newItem.price },
            false,
            "subtotal updated"
          );

          set(
            { cartQuantity: get().cartQuantity + newItem.quantity },
            false,
            "cart quantity updated"
          );
        }
      });

      if (!wasFound) {
        set(
          { cart: [...get().cart, newItem] },
          false,
          "Added " + newItem.name + " to cart"
        );

        set(
          { subtotal: get().subtotal + newItem.price },
          false,
          "subtotal updated"
        );

        set(
          { cartQuantity: get().cartQuantity + newItem.quantity },
          false,
          "cart quantity updated"
        );
      }
    } catch (err) {
      set({ error: err.message, isLoading: false }, false, "Error");
    }
  },
  clearCart: () => {
    try {
      set({ cart: [], subtotal: 0, cartQuantity: 0 }, false, "cleared cart");
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },
  deleteItem: (item) => {
    try {
      set(
        { cart: get().cart.filter((order) => order.id !== item.id) },
        false,
        "Item deleted"
      );

      set({ subtotal: get().subtotal - item.price }, false, "subtotal updated");
      set(
        { cartQuantity: get().cartQuantity - item.quantity },
        false,
        "cart quantity updated"
      );
    } catch (err) {
      set({ error: err.message, isLoading: false }, false, "Error");
    }
  },

  incrementItem: (item) => {
    try {
      const updatedPrice = parseFloat(item.price) + parseFloat(item.basePrice);
      const roundedPrice = parseFloat(updatedPrice.toFixed(2));

      set(
        (state) => ({
          cart: state.cart.map((order) =>
            order.id === item.id
              ? {
                  ...order,
                  quantity: order.quantity + 1,
                  price: roundedPrice.toString(),
                }
              : order
          ),
          subtotal: parseFloat(
            (get().subtotal + parseFloat(item.basePrice)).toFixed(2)
          ),
          cartQuantity: get().cartQuantity + 1,
        }),
        false,
        "Incremented"
      );
    } catch (err) {
      set({ error: err.message, isLoading: false }, false, "Error");
    }
  },

  decrementItem: (item) => {
    try {
      const updatedPrice = parseFloat(item.price) - parseFloat(item.basePrice);
      const roundedPrice = parseFloat(updatedPrice.toFixed(2));

      set(
        (state) => ({
          cart: state.cart.map((order) =>
            order.id === item.id
              ? {
                  ...order,
                  quantity: order.quantity - 1,
                  price: roundedPrice.toString(),
                }
              : order
          ),
          subtotal: parseFloat(
            (get().subtotal - parseFloat(item.basePrice)).toFixed(2)
          ),
          cartQuantity: get().cartQuantity - 1,
        }),
        false,
        "Decremented"
      );
    } catch (err) {
      set({ error: err.message, isLoading: false }, false, "Error");
    }
  },
});

export const useStore = create(
  persist(devtools(MenuStore), {
    name: "store",
  })
);
