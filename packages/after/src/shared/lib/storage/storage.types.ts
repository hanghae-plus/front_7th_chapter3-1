/**
 * Storage adapter interface for type-safe storage operations
 */
export interface StorageAdapter<T> {
  /**
   * Get value from storage
   * @returns The stored value or default value
   */
  get(): T;

  /**
   * Set value in storage
   * @param value - The value to store
   */
  set(value: T): void;

  /**
   * Remove value from storage
   */
  remove(): void;

  /**
   * Check if value exists in storage
   * @returns true if key exists
   */
  exists(): boolean;
}

/**
 * Options for storage adapter configuration
 */
export interface StorageOptions {
  /**
   * Storage instance to use (default: localStorage)
   */
  storage?: Storage;

  /**
   * Custom serializer function
   * @param value - Value to serialize
   * @returns Serialized string
   */
  serializer?: <T>(value: T) => string;

  /**
   * Custom deserializer function
   * @param value - String to deserialize
   * @returns Deserialized value
   */
  deserializer?: <T>(value: string) => T;
}

