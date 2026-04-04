import { PageWrapper } from "./components/PageWrapper";
import { Container } from "./components/Container";
import { Header } from "./components/Header";
import { Search } from "./components/Search";
import { Shortlist } from "./components/Shortlist";
import { PuppiesList } from "./components/PuppiesList";
import { NewPuppyForm } from "./components/NewPuppyForm";
import { puppies as puppiesData } from "./data/puppies";
import { Suspense, use, useEffect, useState } from "react";
import { Puppy } from "./types";
import { LoaderCircle } from "lucide-react";
import { getPuppies } from "./queries";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

export default function App() {
    return (
        <PageWrapper>
            <Container>
                <Header />
                <Main />
            </Container>
        </PageWrapper>
    );
}

function Main() {
    const [liked, setLiked] = useState<Puppy["id"][]>([1, 3]);
    const [searchQuery, SetSearchQuery] = useState<string>("");
    const [puppies, setPuppies] = useState<Puppy[]>(puppiesData);

    return (
        <main>
            <ErrorBoundary
                fallbackRender={({ error }: FallbackProps) => (
                    <div className="mt-12 bg-red-100 p-6 shadow ring ring-black/5">
                        <p className="text-red-500">
                            {(error as Error).message}
                        </p>
                    </div>
                )}
            >
                <Suspense
                    fallback={
                        <div className="mt-12 bg-white p-6 shadow ring ring-black/5">
                            <LoaderCircle className="animate-spin stroke-slate-300" />
                        </div>
                    }
                >
                    <ApiPuppies />
                </Suspense>
            </ErrorBoundary>

            {/* Search & Shortlist */}
            <div className="mt-24 grid gap-8 sm:grid-cols-2">
                <Search
                    searchQuery={searchQuery}
                    setSearchQuery={SetSearchQuery}
                />
                <Shortlist
                    puppies={puppies}
                    liked={liked}
                    setLiked={setLiked}
                />
            </div>

            <PuppiesList
                searchQuery={searchQuery}
                puppies={puppies}
                liked={liked}
                setLiked={setLiked}
            />
            <NewPuppyForm puppies={puppies} setPuppies={setPuppies} />
        </main>
    );
}

const puppyPromise = getPuppies();

// Pattern 1: use() + Suspense (React 19+)
function ApiPuppies() {
    const apiPuppies = use(puppyPromise);

    return (
        <div className="mt-12 bg-green-100 p-6 shadow ring ring-black/5">
            <pre>{JSON.stringify(apiPuppies, null, 2)}</pre>
        </div>
    );
}

// Pattern 2: useState + useEffect (traditional)
// function ApiPuppies() {
//     const [apiPuppies, setApiPuppies] = useState<Puppy[]>([]);
//     const [isLoading, setIsLoading] = useState<boolean>(false);
//     const [error, setError] = useState<string>("");
//
//     useEffect(() => {
//         async function fetchPuppies() {
//             try {
//                 setIsLoading(true);
//                 await new Promise((resolve) => setTimeout(resolve, 1000));
//
//                 const response = await fetch("/puppies.json");
//
//                 if (!response.ok) {
//                     const errorData = await response.json();
//                     setError(errorData.message);
//                     throw errorData;
//                 }
//
//                 const data = await response.json();
//                 setApiPuppies(data);
//             } catch (error) {
//                 console.error(error);
//             }
//
//             setIsLoading(false);
//         }
//
//         fetchPuppies();
//     }, []);
//
//     if (isLoading) {
//         return (
//             <div className="mt-12 bg-white p-6 shadow ring ring-black/5">
//                 <LoaderCircle className="animate-spin stroke-slate-300" />
//             </div>
//         );
//     }
//
//     if (error) {
//         return (
//             <div className="mt-12 bg-red-100 p-6 shadow ring ring-black/5">
//                 <p className="text-red-500">{error}</p>
//             </div>
//         );
//     }
//
//     return (
//         <div className="mt-12 bg-green-100 p-6 shadow ring ring-black/5">
//             <pre>{JSON.stringify(apiPuppies, null, 2)}</pre>
//         </div>
//     );
// }
