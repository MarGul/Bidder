export const fetchCategories = async () => {
    const response = await fetch(`http://bidder.loc/api/v1/categories`);
    const json = await response.json();

    return json.data;
}