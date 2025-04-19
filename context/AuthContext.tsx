"use client";

import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string, role?: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const isAdmin = user?.role === "admin";

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string, role: string = "customer") => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data
      const mockUser: User = {
        id: "user1",
        name: role === "admin" ? "admin" : "customer",
        email: email,
        role: role
      };
      
      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(mockUser));
    } catch (error) {
      console.error("Login failed:", error);
      throw new Error("Invalid credentials");
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock user data
      const mockUser: User = {
        id: "user1",
        name: name,
        email: email,
        role: "customer"
      };

      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(mockUser));
    } catch (error) {
      console.error("Signup failed:", error);
      throw new Error("Failed to create account");
    }
  };

  const logout = async () => {
    try {
      await axios.post('http://localhost:5000/auth/logout');
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem("user");
      window.location.href = '/auth/signin';
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isAdmin, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}