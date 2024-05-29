// Utility function to capitalize the first letter of every word in a string
export const capitalizeWords = str => {
    if (!str) return str;
    return str.replace(/\b\w/g, char => char.toUpperCase());
};
