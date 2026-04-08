import { Puppy, User } from "../types";
import { PUPPIES_STORAGE_KEY, MAX_PUPPIES } from "../constants";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function getUsedImages(): number[] {
    const puppies = getPuppiesFromStorage();
    return puppies
        .map((p) => {
            const match = p.imagePath.match(/\/images\/(\d+)\.jpg$/);
            return match ? parseInt(match[1], 10) : null;
        })
        .filter((n): n is number => n !== null);
}

function getRandomAvailableImage(): string {
    const usedImages = new Set(getUsedImages());
    const available: number[] = [];
    for (let i = 1; i <= MAX_PUPPIES; i++) {
        if (!usedImages.has(i)) {
            available.push(i);
        }
    }
    const randomIndex = Math.floor(Math.random() * available.length);
    return `/images/${available[randomIndex]}.jpg`;
}

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
    formData: FormData,
): Promise<{ puppy: Puppy; puppies: Puppy[] }> {
    await delay(500);
    const puppies = getPuppiesFromStorage();

    if (puppies.length >= MAX_PUPPIES) {
        throw new Error(`Max puppies (${MAX_PUPPIES}) reached`);
    }

    const name = formData.get("name") as string;
    const trait = formData.get("trait") as string;
    const newId = Math.max(0, ...puppies.map((p) => p.id)) + 1;
    const imagePath = getRandomAvailableImage();

    const puppy: Puppy = {
        id: newId,
        name,
        trait,
        imagePath,
        likedBy: [],
    };

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
