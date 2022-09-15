const API_URL = process.env.REACT_APP_API_URL

export async function getBaskets() {
    return await fetch(API_URL + "/baskets")
        .then(response => response.json())
        .then(data => data);
}
