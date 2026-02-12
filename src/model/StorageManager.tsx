import AsyncStorage from '@react-native-async-storage/async-storage';
import { Favorite } from './Favorite';

export default class StorageService<T = any> {
    // Save any JSON serializable value
    static async setItem<T>(key: string, value: T): Promise<void> {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(key, jsonValue);
        } catch (e) {
            console.error(`Error saving item with key "${key}":`, e);
        }
    }

    // Get stored value, or null if not found
    static async getItem<T>(key: string): Promise<T | null> {
        try {
            const jsonValue = await AsyncStorage.getItem(key);
            return jsonValue != null ? JSON.parse(jsonValue) as T : null;
        } catch (e) {
            console.error(`Error reading item with key "${key}":`, e);
            return null;
        }
    }

    // Update existing object (merges old + new JSON)
    static async updateItem<T extends object>(key: string, newData: Partial<T>): Promise<void> {
        try {
            const existing = await this.getItem<T>(key);
            const updated = { ...(existing || {}), ...newData };
            await this.setItem<T>(key, updated as T);
        } catch (e) {
            console.error(`Error updating item with key "${key}":`, e);
        }
    }

    // Delete by key
    static async removeItem(key: string): Promise<void> {
        try {
            await AsyncStorage.removeItem(key);
        } catch (e) {
            console.error(`Error removing item with key "${key}":`, e);
        }
    }

    // Clear all storage
    static async clear(): Promise<void> {
        try {
            await AsyncStorage.clear();
        } catch (e) {
            console.error('Error clearing AsyncStorage:', e);
        }
    }


    static async makeFavorite(favorite: Favorite): Promise<void> {
        this.setItem(favorite.getMovieId(), favorite)
    }

    static async isFavorite(id: string): Promise<boolean> {
        try {
            const value = await AsyncStorage.getItem(id);
            if (!value) return false;

            const favorite = Favorite.fromJSON(JSON.parse(value));
            return favorite != null && favorite.isFavoriteItem();
        } catch (e) {
            console.error('Error checking favorite:', e);
            return false;
        }
    }



    static async getAllFavorites(): Promise<Favorite[]> {
        try {
            const keys = await AsyncStorage.getAllKeys();

            if (!keys || keys.length === 0) {
                return [];
            }

            const entries = await AsyncStorage.multiGet(keys);

            const favorites: Favorite[] = [];

            for (const [, value] of entries) {
                if (!value) continue;

                try {
                    const parsed = Favorite.fromJSON(JSON.parse(value))
                    if (parsed.isFavoriteItem()) {
                        favorites.push(parsed);
                    }
                } catch {
                    // ignore non-JSON or corrupted entries
                }
            }

            return favorites;
        } catch (e) {
            console.error('Error getting all favorites:', e);
            return [];
        }
    }
}
