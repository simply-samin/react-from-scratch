import { Puppy } from "./types";
import { PUPPIES_STORAGE_KEY } from "./constants";

export async function bootstrap(): Promise<void> {
    const storedPuppies = localStorage.getItem(PUPPIES_STORAGE_KEY);

    if (!storedPuppies) {
        const response = await fetch("/puppies.json");
        if (!response.ok) {
            throw new Error("Failed to fetch initial puppies data");
        }
        const data: Puppy[] = await response.json();
        localStorage.setItem(
            PUPPIES_STORAGE_KEY,
            JSON.stringify(data, null, 2),
        );
    }
}
