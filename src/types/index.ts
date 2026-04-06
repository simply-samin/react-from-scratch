export type User = {
    id: number;
    name: string;
}

export type Puppy = {
    id: number;
    name: string;
    trait: string;
    imagePath: string;
    likedBy: User["id"][];
}
