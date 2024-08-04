
export type UserStorage = {
    openaiApiKey: string
}

const USER_STORAGE_KEY = "resto-bot-user-storage"

export function saveUserStorage(jsonObject: UserStorage): void {
    const jsonString = JSON.stringify(jsonObject);
    localStorage.setItem(USER_STORAGE_KEY, jsonString);
}

export function getUserStorage(): UserStorage | null {
    const jsonString = localStorage.getItem(USER_STORAGE_KEY);
    if (jsonString) {
        try {
            return JSON.parse(jsonString);
        } catch (error) {
            console.error('Error parsing JSON from localStorage', error);
            return null
        }
    }
    return null;
}
