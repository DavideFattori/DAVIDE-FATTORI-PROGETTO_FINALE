export default async function gameFetch({ params }) {
    let ratingRecommended, ratingExceptional, ratingMeh, ratingSkip;

    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}games/${params.id}?key=${import.meta.env.VITE_API_KEY}`);
    const json = await response.json();

    const screenShotsResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}games/${params.id}/screenshots?key=${import.meta.env.VITE_API_KEY}`);
    const screenShotsJson = await screenShotsResponse.json();

    const game = json;
    // console.log(json.ratings);
    
    if(json.ratings.length > 0) {
        ratingRecommended = json.ratings[0] ? json.ratings[0].percent : 0;
        ratingExceptional = json.ratings[1] ? json.ratings[1].percent : 0;
        ratingMeh = json.ratings[2] ? json.ratings[2].percent : 0;
        ratingSkip = json.ratings[3] ? json.ratings[3].percent : 0;
    } else {
        ratingRecommended = 0;
        ratingExceptional = 0;
        ratingMeh = 0;
        ratingSkip = 0;
    }
    const screenshots = screenShotsJson.results;

    // console.log(game);

    return { game, ratingRecommended, ratingExceptional, ratingMeh, ratingSkip, screenshots };
}
