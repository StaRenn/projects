import React, { useState, useEffect } from 'react';

export const useFetch = (url) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(url);
            const json = await response.json();
            setData(json);
        }
        fetchData();
    }, [url]);

    return data;
};

export const catchApiRateLimit = (data) => {
    if(!data.message) return false
    return(
        <div className={"rate-limit-exceeded"}>
            <h1>GitHub API 403 Rate Limit Exceeded</h1>
        </div>
    )
}