import ListStore from '../mobx/listStore'
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
                    'ticket':ListStore.ticked
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