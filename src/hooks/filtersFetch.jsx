export async function gamesGenres() {
    const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}genres?key=${import.meta.env.VITE_API_KEY}`
    );
    const json = await response.json();
    return json.results;
}

export async function gamesPlatforms() {
    const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}platforms?key=${import.meta.env.VITE_API_KEY}`
    );
    const json = await response.json();
    return json.results;
}

export async function filters() {
    const genres = await gamesGenres();
    const platforms = await gamesPlatforms();

    return {genres, platforms};
}