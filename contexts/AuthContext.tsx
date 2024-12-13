import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "@/types";

type AuthContextType = {
  initialLoading: boolean;
  isAuthenticated: boolean;
  signIn: (credentials: {
    email: string;
    password: string;
  }) => Promise<boolean>;
  logout: () => Promise<void>;
  signUp: (user: User) => Promise<boolean>;
  updateUserSession: (updatedUser: Partial<User>) => Promise<void>;
  userSession?: User | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [initialLoading, setInitialLoading] = useState(true);
  const [userSession, setUserSession] = useState<User | null>(null);

  const STORAGE_KEYS = {
    USER_SESSION: "userSession",
  };

  useEffect(() => {
    const initializeAuth = async () => {
      const storedUserSession = await AsyncStorage.getItem(
        STORAGE_KEYS.USER_SESSION
      );
      if (storedUserSession) {
        setUserSession(JSON.parse(storedUserSession));
      }
      setInitialLoading(false);
    };

    initializeAuth();
  }, []);

  const signIn = async (credentials: {
    email: string;
    password: string;
  }): Promise<boolean> => {
    // Mock login logic
    if (
      userSession?.email === credentials.email &&
      userSession?.password === credentials.password
    ) {
      return true;
    }
    return false;
  };

  const signUp = async (user: User): Promise<boolean> => {
    try {
      // Simulate API call or logic to store user data
      setUserSession(user);
      await AsyncStorage.setItem(
        STORAGE_KEYS.USER_SESSION,
        JSON.stringify(user)
      );
      return true;
    } catch (error) {
      console.error("Error registering user:", error);
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    setUserSession(null);
    await AsyncStorage.removeItem(STORAGE_KEYS.USER_SESSION);
  };

  const updateUserSession = async (updatedUser: Partial<User>) => {
    if (userSession) {
      const updatedSession = { ...userSession, ...updatedUser };
      setUserSession(updatedSession);
      await AsyncStorage.setItem(
        STORAGE_KEYS.USER_SESSION,
        JSON.stringify(updatedSession)
      );
    }
  };

  const isAuthenticated = useMemo(() => !!userSession, [userSession]);

  if (initialLoading) {
    return null; // Optional: Add a loading spinner here
  }

  return (
    <AuthContext.Provider
      value={{
        initialLoading,
        isAuthenticated,
        signIn,
        logout,
        signUp,
        updateUserSession,
        userSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
