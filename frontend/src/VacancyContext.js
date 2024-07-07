// VacanciesContext.js
import React, { createContext, useState, useEffect } from 'react';

const VacanciesContext = createContext();

export const VacanciesProvider = ({ children }) => {
  const [vacancies, setVacancies] = useState([]);

  useEffect(() => {
    // Fetch vacancies from the server
    const fetchVacancies = async () => {
      try {
        const response = await fetch('http://localhost:8081/home');
        const data = await response.json();
        setVacancies(data);
      } catch (error) {
        console.error('Error fetching vacancies:', error);
      }
    };

    fetchVacancies();
  }, []);

  return (
    <VacanciesContext.Provider value={{ vacancies, setVacancies }}>
      {children}
    </VacanciesContext.Provider>
  );
};

export default VacanciesContext;
