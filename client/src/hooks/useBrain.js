import { useState, useEffect, useCallback } from 'react';
import BrainClient from '../utils/brainClient';

/**
 * 🧠 useBrain Hook
 * React hook for interacting with Brain API
 * Provides easy access to Brain features with loading/error states
 */
export function useBrain(licenseKey) {
  const [brain, setBrain] = useState(null);
  const [isHealthy, setIsHealthy] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!licenseKey) {
      setBrain(null);
      setIsHealthy(false);
      setChecking(false);
      return;
    }

    const brainClient = new BrainClient(licenseKey);
    setBrain(brainClient);

    // Check Brain health
    brainClient.isHealthy().then((healthy) => {
      setIsHealthy(healthy);
      setChecking(false);
    });
  }, [licenseKey]);

  return { brain, isHealthy, checking };
}

/**
 * 🔥 useBrainFeature Hook
 * Execute Brain features with automatic state management
 */
export function useBrainFeature(licenseKey, featureName) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const { brain } = useBrain(licenseKey);

  const execute = useCallback(
    async (params) => {
      if (!brain) {
        setError(new Error('Brain client not initialized'));
        return null;
      }

      setLoading(true);
      setError(null);
      setResult(null);

      try {
        const data = await brain.executeFeature(featureName, params);
        setResult(data);
        return data;
      } catch (err) {
        setError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [brain, featureName]
  );

  return { execute, loading, error, result };
}
