import { useState } from 'react';
import axios from 'axios';

import { YOUR_API_KEY, YOUR_API_URL } from '../constants/apis';
import { Dog } from './Dog';


const useDogService = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const getDogs = async () => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await axios.get(YOUR_API_URL + 'breeds', {
        headers: {
          'x-api-key': YOUR_API_KEY
        }
      });
      const dogs: Dog[] = response.data;
      return dogs;
    } catch (error) {
      console.error('Error fetching dogs:', error);
      setErrorMessage('Ocurrió un error inesperado.');
      throw error;
    }
    finally {
      setIsLoading(false);
    }
  }

  const getOneDog = async (breedId: number) => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await axios.get(`${YOUR_API_URL}images/search`, {
        headers: {
          'x-api-key': YOUR_API_KEY
        },
        params: {
          breed_id: breedId,
          limit: 1
        }
      });
      if (response.data.length === 0) {
        return null; // no hay perro con ese breed_id
      }

    return response.data[0]; // objeto con url, breeds[], etc.
    } catch (error) {
      console.error('Error fetching dogs:', error);
      setErrorMessage('Ocurrió un error inesperado.');
      throw error;
    }
    finally {
      setIsLoading(false);
    }
  }

  return { getDogs, getOneDog, isLoading, errorMessage };
}

export default useDogService;