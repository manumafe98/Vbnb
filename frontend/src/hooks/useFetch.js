export const useFetch = async (url, method, bodyData = null, authentication = false) => {
    let accessToken = ""

    if (!url) return

    if (!authentication) {
        const user = JSON.parse(sessionStorage.getItem("auth"))
        accessToken = user.accessToken
    }

    const options = {
        method: method,
        headers: authentication ? {
            "Content-type": "application/json"
        } : {
            "Content-type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
        body: method == "GET" || method == "DELETE" ? null : JSON.stringify(bodyData)
    }

    return await fetch(url, options)
}
