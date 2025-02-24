export function  getCookie(name) {
    const cookies = document.cookie.split('; ')
    const value = cookies
        .find(c => c.startsWith(name + "="))
        ?.split('=')[1]
    if (value === undefined) {
        document.location.href="/";
        return null;
    } 
    return decodeURIComponent(value)
}