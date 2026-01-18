import { useState, useCallback } from 'react';
import SiteManager from '../features/siteManager';

/**
 * 🌐 useSiteManager Hook
 * React hook for managing websites using Brain API
 */
export function useSiteManager(licenseKey) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [manager] = useState(() => licenseKey ? new SiteManager(licenseKey) : null);

  // Create site
  const createSite = useCallback(
    async (domain, phpVersion = '8.2') => {
      if (!manager) {
        throw new Error('Site manager not initialized');
      }

      setLoading(true);
      setError(null);

      try {
        const result = await manager.createSite(domain, phpVersion);
        return result;
      } catch (err) {
        setError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [manager]
  );

  // Delete site
  const deleteSite = useCallback(
    async (domain) => {
      if (!manager) {
        throw new Error('Site manager not initialized');
      }

      setLoading(true);
      setError(null);

      try {
        const result = await manager.deleteSite(domain);
        return result;
      } catch (err) {
        setError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [manager]
  );

  // Install SSL
  const installSSL = useCallback(
    async (domain, email) => {
      if (!manager) {
        throw new Error('Site manager not initialized');
      }

      setLoading(true);
      setError(null);

      try {
        const result = await manager.installSSL(domain, email);
        return result;
      } catch (err) {
        setError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [manager]
  );

  // Configure Nginx
  const configureNginx = useCallback(
    async (domain, config) => {
      if (!manager) {
        throw new Error('Site manager not initialized');
      }

      setLoading(true);
      setError(null);

      try {
        const result = await manager.configureNginx(domain, config);
        return result;
      } catch (err) {
        setError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [manager]
  );

  // Install WordPress (PRO)
  const installWordPress = useCallback(
    async (domain, wpConfig) => {
      if (!manager) {
        throw new Error('Site manager not initialized');
      }

      setLoading(true);
      setError(null);

      try {
        const result = await manager.installWordPress(domain, wpConfig);
        return result;
      } catch (err) {
        setError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [manager]
  );

  // Setup firewall (PRO)
  const setupFirewall = useCallback(
    async (domain, rules) => {
      if (!manager) {
        throw new Error('Site manager not initialized');
      }

      setLoading(true);
      setError(null);

      try {
        const result = await manager.setupFirewall(domain, rules);
        return result;
      } catch (err) {
        setError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [manager]
  );

  // Setup auto backup (PRO)
  const setupAutoBackup = useCallback(
    async (domain, backupConfig) => {
      if (!manager) {
        throw new Error('Site manager not initialized');
      }

      setLoading(true);
      setError(null);

      try {
        const result = await manager.setupAutoBackup(domain, backupConfig);
        return result;
      } catch (err) {
        setError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [manager]
  );

  // Switch PHP version (PRO)
  const switchPHPVersion = useCallback(
    async (domain, phpVersion) => {
      if (!manager) {
        throw new Error('Site manager not initialized');
      }

      setLoading(true);
      setError(null);

      try {
        const result = await manager.switchPHPVersion(domain, phpVersion);
        return result;
      } catch (err) {
        setError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [manager]
  );

  return {
    loading,
    error,
    createSite,
    deleteSite,
    installSSL,
    configureNginx,
    installWordPress,
    setupFirewall,
    setupAutoBackup,
    switchPHPVersion,
  };
}
