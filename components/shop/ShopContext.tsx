"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type Product = {
  id: string;
  name: string;
  variety: string;
  unit: string;
  price: number;
  discountLabel?: string;
  image: string;
  shortNote: string;
};

type CartItem = Product & {
  quantity: number;
  orderStatus?: "confirmed";
  orderNumber?: string;
};

type UserProfile = {
  name: string;
  email: string;
  phone: string;
};

type StoredAccount = UserProfile & {
  password: string;
};

type AuthMode = "signin" | "signup";

type ShopContextType = {
  user: UserProfile | null;
  cart: CartItem[];
  isAuthOpen: boolean;
  authMode: AuthMode;
  isCartOpen: boolean;
  cartCount: number;
  cartTotal: number;
  openAuth: (mode?: AuthMode) => void;
  closeAuth: () => void;
  openCart: () => void;
  closeCart: () => void;
  signIn: (payload: { email: string; password: string }) => { ok: boolean; message?: string };
  signUp: (payload: {
    name: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
  }) => { ok: boolean; message?: string };
  signOut: () => void;
  addToCart: (product: Product) => { ok: boolean; requiresAuth?: boolean; message?: string };
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, type: "increase" | "decrease") => void;
  markCartAsConfirmed: (orderNumber: string) => void;
};

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const USER_STORAGE_KEY = "satkhirar-amm-user";
const ACCOUNT_STORAGE_KEY = "satkhirar-amm-account";
const CART_STORAGE_KEY = "satkhirar-amm-cart";

export function ShopProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("signin");
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const storedUser = window.sessionStorage.getItem(USER_STORAGE_KEY);
    const storedCart = window.localStorage.getItem(CART_STORAGE_KEY);

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    if (user) {
      window.sessionStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } else {
      window.sessionStorage.removeItem(USER_STORAGE_KEY);
    }
  }, [user]);

  useEffect(() => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const openAuth = (mode: AuthMode = "signin") => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const closeAuth = () => {
    setIsAuthOpen(false);
  };

  const openCart = () => {
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const signIn = (payload: { email: string; password: string }) => {
    if (!payload.email || !payload.password) {
      return { ok: false, message: "ইমেইল এবং পাসওয়ার্ড দিন।" };
    }

    const accountRaw = window.localStorage.getItem(ACCOUNT_STORAGE_KEY);
    const account: StoredAccount | null = accountRaw ? JSON.parse(accountRaw) : null;

    if (
      account &&
      account.email === payload.email &&
      account.password === payload.password
    ) {
      setUser({
        name: account.name,
        email: account.email,
        phone: account.phone,
      });
      setIsAuthOpen(false);
      return { ok: true };
    }

    return {
      ok: false,
      message: "এই ইমেইলে কোনো অ্যাকাউন্ট পাওয়া যায়নি। আগে সাইন আপ করুন।",
    };
  };

  const signUp = (payload: {
    name: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
  }) => {
    if (!payload.name || !payload.email || !payload.phone || !payload.password) {
      return { ok: false, message: "সব তথ্য পূরণ করুন।" };
    }

    if (payload.password.length < 6) {
      return { ok: false, message: "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।" };
    }

    if (payload.password !== payload.confirmPassword) {
      return { ok: false, message: "পাসওয়ার্ড মিলছে না।" };
    }

    const nextAccount: StoredAccount = {
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      password: payload.password,
    };

    window.localStorage.setItem(ACCOUNT_STORAGE_KEY, JSON.stringify(nextAccount));
    setUser({
      name: nextAccount.name,
      email: nextAccount.email,
      phone: nextAccount.phone,
    });
    setIsAuthOpen(false);
    return { ok: true };
  };

  const signOut = () => {
    setUser(null);
    setIsCartOpen(false);
  };

  const addToCart = (product: Product) => {
    if (!user) {
      openAuth("signin");
      return {
        ok: false,
        requiresAuth: true,
        message: "অর্ডার করার আগে লগইন বা সাইন আপ করুন।",
      };
    }

    setCart((current) => {
      const found = current.find((item) => item.id === product.id);

      if (found) {
        return current.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
                orderStatus: undefined,
                orderNumber: undefined,
              }
            : item
        );
      }

      return [...current, { ...product, quantity: 1 }];
    });

    setIsCartOpen(true);

    return { ok: true, message: "পণ্যটি কার্টে যোগ হয়েছে।" };
  };

  const removeFromCart = (productId: string) => {
    setCart((current) => current.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: string, type: "increase" | "decrease") => {
    setCart((current) =>
      current
        .map((item) => {
          if (item.id !== productId) return item;
          const quantity =
            type === "increase" ? item.quantity + 1 : item.quantity - 1;
          return {
            ...item,
            quantity,
            orderStatus: undefined,
            orderNumber: undefined,
          };
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const markCartAsConfirmed = (orderNumber: string) => {
    setCart((current) =>
      current.map((item) => ({
        ...item,
        orderStatus: "confirmed",
        orderNumber,
      }))
    );
  };

  const value = useMemo(
    () => ({
      user,
      cart,
      isAuthOpen,
      authMode,
      isCartOpen,
      cartCount: cart.reduce((total, item) => total + item.quantity, 0),
      cartTotal: cart.reduce((total, item) => total + item.price * item.quantity, 0),
      openAuth,
      closeAuth,
      openCart,
      closeCart,
      signIn,
      signUp,
      signOut,
      addToCart,
      removeFromCart,
      updateQuantity,
      markCartAsConfirmed,
    }),
    [user, cart, isAuthOpen, authMode, isCartOpen]
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const context = useContext(ShopContext);

  if (!context) {
    throw new Error("useShop must be used within a ShopProvider");
  }

  return context;
}
