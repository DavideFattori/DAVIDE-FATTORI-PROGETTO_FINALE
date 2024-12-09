import { useEffect, useState } from "react";


function useFetch(url) {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {

        if (!url) {
            return;
        }

        (async function fetchData() {
            setLoading(true);
            try {
                await new Promise((resolve) => setTimeout(resolve, 1500));
                const response = await fetch(url);
                const json = await response.json();
                setData(json.results);
                setLoading(false);

                console.log(json.results);
                
            } catch (error) {
                setLoading(false);
                setError(`Error: ${error.message}`);
            }
            
            
        })();
    }, [url]);

    
    return {data, loading, error};

}

export default useFetch