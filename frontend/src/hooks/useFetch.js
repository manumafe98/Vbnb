export const useFetch = async (url, method, bodyData = null, authentication = false) => {

    if (!url) return

    const options = {
        method: method,
        headers: authentication ? {
            "Content-type": "application/json"
        } : {
            "Content-type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem("jwt_authorization")}`
        },
        body: method == "GET" || method == "DELETE" ? null : JSON.stringify(bodyData)
    }

    return await fetch(url, options)
}
