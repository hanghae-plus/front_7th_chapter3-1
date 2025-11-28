import type { StorageAdapter, StorageOptions } from './storage.types';

/**
 * Creates a storage adapter for a specific key with type safety
 * @param key - Storage key
 * @param defaultValue - Default value when key doesn't exist
 * @param options - Storage configuration options
 * @returns Storage adapter instance
 */
export function createStorageAdapter<T>(
  key: string,
  defaultValue: T,
  options: StorageOptions = {}
): StorageAdapter<T> {
  const {
    storage = localStorage,
    serializer = JSON.stringify,
    deserializer = JSON.parse
  } = options;

  return {
    /**
     * Get value from storage
     * Returns default value if key doesn't exist or parsing fails
     */
    get(): T {
      try {
        const item = storage.getItem(key);
        if (item === null) {
          return defaultValue;
        }
        return deserializer(item) as T;
      } catch (error) {
        console.error(`Failed to get item from storage for key "${key}":`, error);
        return defaultValue;
      }
    },

    /**
     * Set value in storage
     * Handles quota exceeded errors
     */
    set(value: T): void {
      try {
        const serialized = serializer(value);
        storage.setItem(key, serialized);
      } catch (error) {
        if (error instanceof DOMException && error.code === 22) {
          // QuotaExceededError
          console.error('Storage quota exceeded');
          throw new Error('Storage quota exceeded. Please clear some data.');
        }
        console.error(`Failed to set item in storage for key "${key}":`, error);
        throw error;
      }
    },

    /**
     * Remove value from storage
     */
    remove(): void {
      try {
        storage.removeItem(key);
      } catch (error) {
        console.error(`Failed to remove item from storage for key "${key}":`, error);
      }
    },

    /**
     * Check if key exists in storage
     */
    exists(): boolean {
      return storage.getItem(key) !== null;
    }
  };
}


/**
 * Clear all items from storage
 * @param storage - Storage instance to clear (default: localStorage)
 */
export function clearStorage(storage: Storage = localStorage): void {
  try {
    storage.clear();
  } catch (error) {
    console.error('Failed to clear storage:', error);
  }
}

/**
 * Get all keys from storage
 * @param storage - Storage instance to query (default: localStorage)
 * @returns Array of storage keys
 */
export function getStorageKeys(storage: Storage = localStorage): string[] {
  try {
    return Object.keys(storage);
  } catch (error) {
    console.error('Failed to get storage keys:', error);
    return [];
  }
}

/**
 * Check if storage is available
 * @param type - Type of storage ('localStorage' or 'sessionStorage')
 * @returns true if storage is available and working
 */
export function isStorageAvailable(type: 'localStorage' | 'sessionStorage' = 'localStorage'): boolean {
  try {
    const storage = window[type];
    const testKey = '__storage_test__';
    storage.setItem(testKey, 'test');
    storage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}