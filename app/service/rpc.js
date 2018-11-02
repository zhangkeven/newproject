export default class FetchUtil {
    static get(url) {
        return new Promise((resolve, reject) => {
            fetch(url)
                .then(response => response.json())
                .then(result => {
                    resolve(result);
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

    static post(url, data) {
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8 ',
                    'ticket':'016f9ffec43e43a58aaaf44d8ba41d32'
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(result => {
                    resolve(result);
                })
                .catch(error => {
                    reject(error)
                })
        })
    }
}