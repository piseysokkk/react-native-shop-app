import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import { User } from "../types/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextType = {
  user: User | null;
  isAuthLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AUTH_STORAGE_KEY = "SHOP_APP_AUTH_USER";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type Props = {
  children: ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const savedUser = await AsyncStorage.getItem(AUTH_STORAGE_KEY);

      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      setIsAuthLoading(false);
    }

    loadUser();
  }, []);

  async function login(email: string, password: string) {
    const loggedInUser = {
      name: "Demo User",
      email,
    };

    setUser(loggedInUser);
    await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(loggedInUser));
  }

  async function register(name: string, email: string, password: string) {
    const newUser = {
      name,
      email,
    };

    setUser(newUser);
    await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));
  }
  async function logout() {
    setUser(null);
    await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthLoading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
