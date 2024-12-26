export default async function gameFetch({ params }) {

    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}games/${params.id}?key=${import.meta.env.VITE_API_KEY}`);
    const json = await response.json();

    const game = json;
    const ratingRecommended = json.ratings[0].percent;
    const ratingExceptional = json.ratings[1].percent;
    const ratingMeh = json.ratings[2].percent;
    const ratingSkip = json.ratings[3].percent;

    // console.log(game);

    return { game, ratingRecommended, ratingExceptional, ratingMeh, ratingSkip };
}
