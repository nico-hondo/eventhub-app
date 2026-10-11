/**
 * Generic fetch wrapper for API requests
 * @param {string} urlFetch - Target API URL
 * @param {RequestInit} [options={}] - Options object (method, headers, body, etc.)
 * @returns {Promise<any>}
 */

async function fetchUrl(urlFetch, options = {}){
    const res = await fetch(urlFetch, options); //pass options ke fetch
    if(!res.ok) {
        //take pesan error jiika ada dari backend
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.Msg || errorData?.message || `HTTP Error ${res.status}`);
    }

    if (res.status === 401){
        localStorage.clear();
        window.location.href = "/auth";
        throw new Error("Session Expired, Silahkan login kembali");
    }
    
    const data = await res.json();

    if(data.results && Array.isArray(data.results)){    
        const eventHub = await Promise.all(
            data.results.map(async(item) => {
                if(item.url){
                    const res = await fetch(item.url, options);

                    if(!res.ok) throw new Error(`HTTP Error ${res.status}`);
                    return await res.json();
                }
                return item;
            })
        );
        return eventHub;
    }

    return data;
}

export default fetchUrl;