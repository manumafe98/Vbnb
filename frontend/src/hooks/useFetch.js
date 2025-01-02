export const useFetch = async (url, method, bodyData = null, requiresAuthentication = true) => {
    let accessToken = ""

    if (!url) return

    if (requiresAuthentication) {
        const user = JSON.parse(sessionStorage.getItem("auth"))
        accessToken = user.accessToken
    }

    const options = {
        method: method,
        headers: requiresAuthentication ? {
            "Content-type": "application/json",
            "Access-Control-Allow-Origin": import.meta.env.BACKEND_URL,
            "Authorization": `Bearer ${accessToken}`
        } : {
            "Content-type": "application/json",
            "Access-Control-Allow-Origin": import.meta.env.BACKEND_URL
        },
        body: method == "GET" || method == "DELETE" ? null : JSON.stringify(bodyData)
    }

    return await fetch(url, options)
}
