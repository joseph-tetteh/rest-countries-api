import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const http = axios.create({
  baseURL: 'https://restcountries.com/v2',
});

const ApiContext = createContext<any>(null);

interface ApiProviderProps{

  children: ReactNode;
}

export const ApiProvider = ({ children }:ApiProviderProps) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await http.get('/all');
        setCountries(response.data);
      } catch (error) {
        console.error('Failed to retrieve countries:', error);
      }
    };

    fetchCountries();
  }, []);

  return <ApiContext.Provider value={countries}>{children}</ApiContext.Provider>;
};

export const useApi = () => useContext(ApiContext);
