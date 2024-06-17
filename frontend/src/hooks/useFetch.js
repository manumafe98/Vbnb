export const useFetch = async (url, method, bodyData = null, authentication = false, token = null) => {

    if (!url) return

    const options = {
        method: method,
        headers: authentication ? {
            "Content-type": "application/json"
        } : {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: method == "GET" || method == "DELETE" ? null : JSON.stringify(bodyData)
    }

    return await fetch(url, options)
}
