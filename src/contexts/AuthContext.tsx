import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserData, getUserProfile, logoutUser } from '@/utils/api';

interface AuthContextType {
  user: UserData | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (userData: UserData) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        // Check if there's a stored user in localStorage
        const storedUser = localStorage.getItem('userInfo');
        
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          
          // Verify the token is valid by getting the user profile
          const userProfile = await getUserProfile();
          
          if (userProfile) {
            setUser(parsedUser);
          } else {
            // Token invalid or expired, remove from storage
            localStorage.removeItem('userInfo');
          }
        }
      } catch (error) {
        console.error('Error loading user:', error);
        localStorage.removeItem('userInfo');
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = (userData: UserData) => {
    setUser(userData);
  };

  const logout = () => {
    logoutUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user, 
        isLoading,
        login, 
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext; 