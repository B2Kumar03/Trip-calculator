import { useState } from 'react';
import toast from 'react-hot-toast';

export const useApi = () => {
  const [loading, setLoading] = useState(false);

  const execute = async (apiCall, options = {}) => {
    const {
      showLoading = true,
      successMessage,
      errorMessage,
      onSuccess,
      onError,
      silent = false,
    } = options;

    try {
      if (showLoading) setLoading(true);
      
      const data = await apiCall();
      
      if (successMessage && !silent) {
        toast.success(successMessage);
      }
      
      if (onSuccess) {
        onSuccess(data);
      }
      
      return { data, error: null };
    } catch (error) {
      const message = error.message || errorMessage || 'An error occurred';
      
      if (!silent) {
        toast.error(message);
      }
      
      if (onError) {
        onError(error);
      }
      
      return { data: null, error };
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  return { execute, loading };
};

export default useApi;
