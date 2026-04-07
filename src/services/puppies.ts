import { Puppy, User } from "../types";
import { PUPPIES_STORAGE_KEY } from "../constants";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function getPuppiesFromStorage(): Puppy[] {
    const data = localStorage.getItem(PUPPIES_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

function setPuppiesToStorage(puppies: Puppy[]): void {
    localStorage.setItem(PUPPIES_STORAGE_KEY, JSON.stringify(puppies, null, 2));
}

export async function getAllPuppies(): Promise<Puppy[]> {
    await delay(500);
    return getPuppiesFromStorage();
}

export async function storePuppy(
    puppy: Puppy,
): Promise<{ puppy: Puppy; puppies: Puppy[] }> {
    await delay(500);
    const puppies = getPuppiesFromStorage();
    puppies.push(puppy);
    setPuppiesToStorage(puppies);
    return { puppy, puppies };
}

export async function updatePuppy(
    puppyId: Puppy["id"],
    updates: Partial<Puppy>,
): Promise<{ puppy: Puppy; puppies: Puppy[] }> {
    await delay(500);
    const puppies = getPuppiesFromStorage();
    const puppy = puppies.find((p) => p.id === puppyId);
    if (!puppy) throw new Error("Puppy not found");
    Object.assign(puppy, updates);
    setPuppiesToStorage(puppies);
    return { puppy, puppies };
}

export async function toggleLikedStatus(
    puppyId: Puppy["id"],
    userId: User["id"],
): Promise<{ puppy: Puppy; puppies: Puppy[] }> {
    await delay(500);
    const puppies = getPuppiesFromStorage();
    const puppy = puppies.find((p) => p.id === puppyId);
    if (!puppy) throw new Error("Puppy not found");
    if (!puppy.likedBy.includes(userId)) {
        puppy.likedBy.push(userId);
    } else {
        puppy.likedBy = puppy.likedBy.filter((id) => id !== userId);
    }
    setPuppiesToStorage(puppies);
    return { puppy, puppies };
}
