"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { apiRequest, getApiError } from "lib/api";
import { popularMangoes } from "data/popularMangoes";

export type Product = {
  id: string;
  name: string;
  variety: string;
  unit: string;
  price: number;
  discountLabel?: string;
  image: string;
  shortNote: string;
  category?: string;
  stock?: number;
  sales?: number;
  status?: string;
  color?: string;
  isActive?: boolean;
  isFeatured?: boolean;
};

type CartItem = Product & {
  quantity: number;
  orderStatus?: "confirmed";
  orderNumber?: string;
};

type UserProfile = {
  id?: string;
  name: string;
  email: string;
  phone: string;
  source?: string;
  status?: string;
  joinedAt?: string;
};

type AuthMode = "signin" | "signup";

type AuthResponse = {
  token: string;
  user: UserProfile;
};

type ShopContextType = {
  user: UserProfile | null;
  products: Product[];
  isProductsLoading: boolean;
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
  refreshProducts: () => Promise<void>;
  signIn: (payload: {
    email: string;
    password: string;
  }) => Promise<{ ok: boolean; message?: string }>;
  signUp: (payload: {
    name: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
  }) => Promise<{ ok: boolean; message?: string }>;
  signOut: () => void;
  addToCart: (product: Product) => { ok: boolean; requiresAuth?: boolean; message?: string };
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, type: "increase" | "decrease") => void;
  markCartAsConfirmed: (orderNumber: string) => void;
};

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const USER_STORAGE_KEY = "satkhirar-amm-user";
const TOKEN_STORAGE_KEY = "satkhirar-amm-token";
const CART_STORAGE_KEY = "satkhirar-amm-cart";

function getActiveCartItems(items: CartItem[]) {
  return items.filter((item) => item.orderStatus !== "confirmed");
}

export function ShopProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [products, setProducts] = useState<Product[]>(popularMangoes);
  const [isProductsLoading, setIsProductsLoading] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("signin");
  const [isCartOpen, setIsCartOpen] = useState(false);

  const refreshProducts = useCallback(async () => {
    setIsProductsLoading(true);

    try {
      const nextProducts = await apiRequest<Product[]>(
        "/api/products?active=true&featured=true"
      );

      setProducts(nextProducts.length > 0 ? nextProducts : popularMangoes);
    } catch {
      setProducts(popularMangoes);
    } finally {
      setIsProductsLoading(false);
    }
  }, []);

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
    void refreshProducts();
  }, [refreshProducts]);

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

  const signIn = async (payload: { email: string; password: string }) => {
    if (!payload.email || !payload.password) {
      return { ok: false, message: "ইমেইল এবং পাসওয়ার্ড দিন।" };
    }

    try {
      const response = await apiRequest<AuthResponse>("/api/auth/signin", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      window.sessionStorage.setItem(TOKEN_STORAGE_KEY, response.token);
      setUser(response.user);
      setIsAuthOpen(false);
      return { ok: true };
    } catch (error) {
      return {
        ok: false,
        message: getApiError(error, "লগইন করা যায়নি। আবার চেষ্টা করুন।"),
      };
    }
  };

  const signUp = async (payload: {
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
      return { ok: false, message: "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।" };
    }

    if (payload.password !== payload.confirmPassword) {
      return { ok: false, message: "পাসওয়ার্ড মিলছে না।" };
    }

    try {
      const response = await apiRequest<AuthResponse>("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      window.sessionStorage.setItem(TOKEN_STORAGE_KEY, response.token);
      setUser(response.user);
      setIsAuthOpen(false);
      return { ok: true };
    } catch (error) {
      return {
        ok: false,
        message: getApiError(error, "সাইন আপ সম্পন্ন হয়নি। আবার চেষ্টা করুন।"),
      };
    }
  };

  const signOut = () => {
    setUser(null);
    window.sessionStorage.removeItem(TOKEN_STORAGE_KEY);
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
      const activeItems = getActiveCartItems(current);
      const found = activeItems.find((item) => item.id === product.id);

      if (found) {
        return activeItems.map((item) =>
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

      return [...activeItems, { ...product, quantity: 1 }];
    });

    setIsCartOpen(true);

    return { ok: true, message: "পণ্যটি কার্টে যোগ হয়েছে।" };
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
      current.map((item) =>
        item.orderStatus === "confirmed"
          ? item
          : {
              ...item,
              orderStatus: "confirmed",
              orderNumber,
            }
      )
    );
  };

  const value = useMemo(
    () => ({
      user,
      products,
      isProductsLoading,
      cart,
      isAuthOpen,
      authMode,
      isCartOpen,
      cartCount: getActiveCartItems(cart).reduce(
        (total, item) => total + item.quantity,
        0
      ),
      cartTotal: getActiveCartItems(cart).reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),
      openAuth,
      closeAuth,
      openCart,
      closeCart,
      refreshProducts,
      signIn,
      signUp,
      signOut,
      addToCart,
      removeFromCart,
      updateQuantity,
      markCartAsConfirmed,
    }),
    [
      user,
      products,
      isProductsLoading,
      cart,
      isAuthOpen,
      authMode,
      isCartOpen,
      refreshProducts,
    ]
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
