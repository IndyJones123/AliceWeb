export const setCookies = (name, value) => {
    document.cookie = `${name}=${value};path=/;`;
};
