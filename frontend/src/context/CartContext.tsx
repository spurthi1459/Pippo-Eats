// frontend/src/context/CartContext.tsx
import React, { createContext, useContext, useReducer } from "react";
import type { CartItem } from "../types";

type CartState = {
  items: CartItem[];
  placed: boolean;
};

type CartContextShape = {
  state: CartState;
  add: (item: Omit<CartItem, "qty">) => void; // add with qty managed by reducer
  addOne: (id: string) => void;
  removeOne: (id: string) => void;
  removeItem: (id: string) => void;
  clear: () => void;
  setPlaced: (v: boolean) => void;
};

const initialState: CartState = {
  items: [],
  placed: false,
};

type Action =
  | { type: "ADD"; payload: Omit<CartItem, "qty"> }
  | { type: "ADD_ONE"; id: string }
  | { type: "REMOVE_ONE"; id: string }
  | { type: "REMOVE_ITEM"; id: string }
  | { type: "CLEAR" }
  | { type: "SET_PLACED"; placed: boolean };

function cartReducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case "ADD": {
      const p = action.payload;
      const exist = state.items.find((it) => it.id === p.id);
      if (exist) {
        return {
          ...state,
          items: state.items.map((it) =>
            it.id === p.id ? { ...it, qty: it.qty + 1 } : it
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...p, qty: 1 }],
      };
    }

    case "ADD_ONE": {
      return {
        ...state,
        items: state.items.map((it) =>
          it.id === action.id ? { ...it, qty: it.qty + 1 } : it
        ),
      };
    }

    case "REMOVE_ONE": {
      return {
        ...state,
        items: state.items
          .map((it) => (it.id === action.id ? { ...it, qty: it.qty - 1 } : it))
          .filter((it) => it.qty > 0),
      };
    }

    case "REMOVE_ITEM":
      return { ...state, items: state.items.filter((it) => it.id !== action.id) };

    case "CLEAR":
      return initialState;

    case "SET_PLACED":
      return { ...state, placed: action.placed };

    default:
      return state;
  }
}

const CartContext = createContext<CartContextShape | null>(null);

export const useCart = (): CartContextShape => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const add = (item: Omit<CartItem, "qty">) => dispatch({ type: "ADD", payload: item });
  const addOne = (id: string) => dispatch({ type: "ADD_ONE", id });
  const removeOne = (id: string) => dispatch({ type: "REMOVE_ONE", id });
  const removeItem = (id: string) => dispatch({ type: "REMOVE_ITEM", id });
  const clear = () => dispatch({ type: "CLEAR" });
  const setPlaced = (v: boolean) => dispatch({ type: "SET_PLACED", placed: v });

  const value: CartContextShape = {
    state,
    add,
    addOne,
    removeOne,
    removeItem,
    clear,
    setPlaced,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
