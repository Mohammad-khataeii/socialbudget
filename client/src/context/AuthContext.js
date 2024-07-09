import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Fetch user data if needed
        // setUser(fetchedUserData);
    }, []);

    const login = async (credentials) => {
        const response = await api.post('/login', credentials);
        setUser(response.data.user);
    };

    const logout = async () => {
        await api.post('/logout');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
