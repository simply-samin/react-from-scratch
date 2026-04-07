import {
    getAllPuppies,
    toggleLikedStatus as togglePuppyLikedStatus,
} from "../services/puppies";
import { Puppy, User } from "../types";

export async function getPuppies(): Promise<Puppy[]> {
    return await getAllPuppies();
}

export async function toggleLikedStatus(
    puppyId: Puppy["id"],
    userId: User["id"] = 1,
): Promise<{ puppy: Puppy; puppies: Puppy[] }> {
    try {
        return await togglePuppyLikedStatus(puppyId, userId);
    } catch (error) {
        console.error(error);
        throw error;
    }
}
