import { X } from "lucide-react";
import { Puppy } from "../types";
import { Dispatch, SetStateAction } from "react";
import { Heart } from "lucide-react";

export function Shortlist({ 
    puppies,
    liked,
    setLiked, 
}: { 
    puppies: Puppy[];
    liked: Puppy["id"][];
    setLiked: Dispatch<SetStateAction<Puppy["id"][]>>;
}) {
    const shortlistedPuppies = puppies.filter((puppy) => liked.includes(puppy.id));

    return (
        <div>
            <h2 className="flex items-center gap-2 font-medium">
                <span>Your shortlist</span>
                <Heart className="size-6 fill-pink-500 stroke-pink-500"></Heart>
            </h2>
            <ul className="mt-4 flex flex-wrap gap-4">
                {shortlistedPuppies.map((puppy) => (
                    <li
                        key={puppy.id}
                        className="relative flex items-center overflow-clip rounded-md bg-white shadow-sm ring ring-black/5 transition duration-100 starting:scale-0 starting:opacity-0"
                    >
                        <img
                            height={32}
                            width={32}
                            alt={puppy.name}
                            className="aspect-square w-8 object-cover"
                            src={puppy.imagePath}
                        />
                        <p className="px-3 text-sm text-slate-800">{puppy.name}</p>
                        <button
                            className="group h-full border-l border-slate-100 px-2 hover:bg-slate-100"
                            onClick={() =>
                                setLiked(liked.filter((pupId) => pupId !== puppy.id))
                            }
                        >   
                            <X className="size-4 stroke-slate-400 group-hover:stroke-red-400" />
                        </button>
                    </li>
                ))}
                {shortlistedPuppies.length === 0 ? (
                    <p className="text-sm text-slate-500">No liked puppies yet.</p>
                ) : null}
            </ul>
        </div>
    );
}
