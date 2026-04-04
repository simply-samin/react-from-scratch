import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const publicDir = path.join(__dirname, "../public");

export async function readJSON(filename) {
    const data = await fs.readFile(path.join(publicDir, filename), "utf-8");
    return JSON.parse(data);
}

export async function writeJSON(filename, data) {
    await fs.writeFile(
        path.join(publicDir, filename),
        JSON.stringify(data, null, 2),
    );
}

export async function addUser(name) {
    const users = await readJSON("users.json");
    const newUser = { id: Date.now(), name };
    users.push(newUser);
    await writeJSON("users.json", users);
    return newUser;
}

export async function addPuppyLike(puppyId, userId) {
    const puppies = await readJSON("puppies.json");
    const puppy = puppies.find((p) => p.id === puppyId);
    if (!puppy) throw new Error("Puppy not found");
    if (!puppy.likedBy.includes(userId)) {
        puppy.likedBy.push(userId);
        await writeJSON("puppies.json", puppies);
    }
    return puppy;
}

const [, , command, ...args] = process.argv;

(async () => {
    if (command === "add-user") {
        const name = args[0];
        if (!name) {
            console.error("Usage: node utils/jsonUtils.js add-user <name>");
            process.exit(1);
        }
        const user = await addUser(name);
        console.log("Added:", user);
    } else if (command === "like") {
        const [puppyId, userId] = args.map(Number);
        if (!puppyId || !userId) {
            console.error(
                "Usage: node utils/jsonUtils.js like <puppyId> <userId>",
            );
            process.exit(1);
        }
        const puppy = await addPuppyLike(puppyId, userId);
        console.log("Updated:", puppy.name, "likedBy:", puppy.likedBy);
    } else {
        console.log("Commands: add-user <name>, like <puppyId> <userId>");
    }
})();
