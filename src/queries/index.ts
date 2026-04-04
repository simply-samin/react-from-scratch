export async function getPuppies() {
    try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const response = await fetch("/puppies.json");

        if (!response.ok) {
            const errorData = await response.json();
            throw errorData;
        }

        const data = await response.json();

        return data

    } catch (error) {
        console.error(error);
        throw error;
    }

}
