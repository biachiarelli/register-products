import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '../../models/User';
import api from '../../services/api';
import { CircularProgress } from '@mui/material';

interface UserContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
  setIsLoading: (loading: boolean) => void;
  logout: () => void;
  isLoading: boolean;
}

const UserContext = createContext<UserContextProps>({
  user: null,
  setUser: () => {},
  setIsLoading: () => {},
  logout: () => {},
  isLoading: false,
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  
  useEffect(() => {
    setIsLoading(true);
    const token = localStorage.getItem('token');

    if (token && !user) {
      api.get<User[]>('/user')
        .then((res) => {
          const found = res.data.find((u) => u.token === token);
          if (found) {
            setUser(found);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout, isLoading, setIsLoading }}>
    {isLoading ? (
        <div
            style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
            }}
        >
            <CircularProgress style={{ color: 'white' }} />
        </div>
    ) : (
      children
    )}
  </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
