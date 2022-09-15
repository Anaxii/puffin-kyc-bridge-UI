const API_URL = process.env.REACT_APP_API_URL

async function get(method: string): Promise<any> {
    return await fetch(API_URL + method)
        .then((response: Response) => response.json())
        .then(data => data)
        .catch((err: any) => []);
}

export const getBaskets = async (): Promise<any> => await get("/baskets")
export const getTokens = async (): Promise<any> => await get("/tokens")
