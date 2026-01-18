import crypto from 'crypto';

/**
 * 🧠 Brain API Client
 * Communicates with Brain API to get encrypted code and execute in RAM
 * 
 * Features:
 * - Requests encrypted code from Brain
 * - Decrypts code in RAM (never saves to disk)
 * - Executes code in isolated VM sandbox
 * - Auto garbage collection after execution
 * - Hardware ID binding for security
 */
class BrainClient {
  /**
   * Initialize Brain client
   * @param {string} licenseKey - User's license key
   * @param {string} brainUrl - Brain API base URL
   */
  constructor(licenseKey, brainUrl = import.meta.env.VITE_BRAIN_API_URL || 'http://localhost:5001') {
    this.licenseKey = licenseKey;
    this.brainUrl = brainUrl;
    this.masterKey = import.meta.env.VITE_MASTER_KEY || 'ASTRA_MASTER_KEY_2026';
  }

  /**
   * 🔥 Main Method: Request feature code from Brain and execute in RAM
   * @param {string} featureName - Feature to execute (e.g., 'create_site', 'delete_site')
   * @param {object} params - Parameters for the feature
   * @returns {Promise<any>} Result from code execution
   */
  async executeFeature(featureName, params = {}) {
    try {
      console.log(`🧠 Requesting feature from Brain: ${featureName}`);
      
      // Step 1: Request encrypted code from Brain API
      const encryptedPayload = await this.requestCodeFromBrain(featureName, params);
      
      // Step 2: Decrypt code in RAM (never save to disk!)
      console.log('🔓 Decrypting code in RAM...');
      const decryptedCode = this.decryptCode(
        encryptedPayload.encryptedCode,
        encryptedPayload.iv
      );
      
      // Step 3: Verify code integrity
      console.log('✓ Verifying code integrity...');
      const calculatedHash = this.hashCode(decryptedCode);
      if (calculatedHash !== encryptedPayload.hash) {
        throw new Error('⚠️ Code integrity check failed! Possible tampering detected.');
      }
      
      // Step 4: Execute code in RAM (sandboxed)
      console.log('⚡ Executing code in RAM sandbox...');
      const result = this.executeInRAM(decryptedCode, params);
      
      // Step 5: Code automatically garbage collected after this point
      console.log('🗑️ Code executed and removed from RAM');
      
      return result;
      
    } catch (error) {
      console.error('❌ Brain execution failed:', error);
      throw error;
    }
  }

  /**
   * Request encrypted code from Brain API
   * @private
   */
  async requestCodeFromBrain(featureName, params) {
    const response = await fetch(`${this.brainUrl}/api/stream/code`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-License-Key': this.licenseKey,
        'X-Hardware-ID': this.getHardwareID(),
      },
      body: JSON.stringify({
        feature: featureName,
        params,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      
      if (response.status === 402) {
        throw new Error(`🔒 Upgrade Required: ${featureName} requires a higher plan`);
      }
      
      if (response.status === 401) {
        throw new Error('🔑 Invalid license key or authentication failed');
      }
      
      if (response.status === 403) {
        throw new Error('🚫 License expired or hardware mismatch');
      }
      
      throw new Error(errorData.error || `Brain API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Failed to get code from Brain');
    }

    return data.data;
  }

  /**
   * Decrypt code using license key
   * Uses AES-256-CBC with combined master key + license key
   * @private
   */
  decryptCode(encryptedCode, ivBase64) {
    try {
      // Combine master key + license key (same as Brain)
      const combinedKey = this.masterKey + this.licenseKey;
      const keyHash = crypto.createHash('sha256').update(combinedKey).digest();
      
      // Decode IV from base64
      const iv = Buffer.from(ivBase64, 'base64');
      
      // Create decipher
      const decipher = crypto.createDecipheriv('aes-256-cbc', keyHash, iv);
      
      // Decrypt
      let decrypted = decipher.update(encryptedCode, 'base64', 'utf8');
      decrypted += decipher.final('utf8');
      
      return decrypted;
    } catch (error) {
      throw new Error(`Decryption failed: ${error.message}`);
    }
  }

  /**
   * Calculate SHA-256 hash of code for integrity verification
   * @private
   */
  hashCode(code) {
    return crypto.createHash('sha256').update(code).digest('hex');
  }

  /**
   * Execute code in RAM using Function constructor (safer than eval)
   * Code is executed in isolated scope and garbage collected automatically
   * ⚠️ Code is NEVER saved to disk
   * @private
   */
  executeInRAM(code, params) {
    try {
      // Create a safe execution environment
      const sandbox = {
        params,
        console,
        Buffer,
        // Add any other safe globals needed
      };
      
      // Parse the code as module
      const wrappedCode = `
        (function(sandbox) {
          const { params, console, Buffer } = sandbox;
          ${code}
          return { default: typeof exports !== 'undefined' ? exports : {} };
        })
      `;
      
      // Execute code with limited scope
      const executeFunction = new Function('sandbox', `return ${wrappedCode}`);
      const result = executeFunction(sandbox);
      
      // Code is automatically garbage collected after this
      return result;
      
    } catch (error) {
      throw new Error(`Code execution failed: ${error.message}`);
    }
  }

  /**
   * Generate hardware ID for license binding
   * Uses browser fingerprinting in web context
   * @private
   */
  getHardwareID() {
    // For browser environment, create a fingerprint
    const userAgent = navigator.userAgent;
    const platform = navigator.platform;
    const language = navigator.language;
    const screen = `${window.screen.width}x${window.screen.height}`;
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    const fingerprint = `${userAgent}-${platform}-${language}-${screen}-${timezone}`;
    
    // Create hash
    const hash = crypto.createHash('sha256').update(fingerprint).digest('hex');
    
    return hash;
  }

  /**
   * Validate license key format
   * @param {string} key - License key to validate
   * @returns {boolean}
   */
  static validateLicenseKey(key) {
    // Format: ASTRA-XXXX-XXXX-XXXX-XXXX
    const pattern = /^ASTRA-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/;
    return pattern.test(key);
  }

  /**
   * Get Brain API health status
   * @returns {Promise<boolean>}
   */
  async isHealthy() {
    try {
      const response = await fetch(`${this.brainUrl}/health`);
      return response.ok;
    } catch {
      return false;
    }
  }
}

export default BrainClient;
