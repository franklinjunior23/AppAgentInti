import { useState, useEffect } from 'react';

const useLocalStorage = (key) => {

    const parseValue = (value) => {
        try {
            return JSON.parse(value);
        } catch {
            // Si no es JSON, devolver el valor tal como está
            return value;
        }
    };

    // Estado inicial basado en el valor de localStorage
    const [value, setValue] = useState(() => {
        try {
            const storedValue = localStorage.getItem(key);
            return parseValue(storedValue);
        } catch (error) {
            console.error('Error reading localStorage key', key, error);
            return null;
        }
    });

    // Función auxiliar para manejar valores JSON y strings

    // Actualiza el estado cuando el valor de localStorage cambia
    useEffect(() => {
        const handleStorageChange = (event) => {
            if (event.key === key) {
                setValue(parseValue(event.newValue));
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [key]);

    // Devuelve el valor actual
    return value;
};

export default useLocalStorage;
