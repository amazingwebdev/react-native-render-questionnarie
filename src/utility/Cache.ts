import { AsyncStorage } from 'react-native'

class CacheStore {

    private readonly CACHE_PREFIX = 'cachestore-'
    private readonly CACHE_EXPIRATION_PREFIX = 'cacheexpiration-'
    private readonly EXPIRY_UNITS = 60 * 1000

    constructor() {
        this.flushExpired()
    }

    public get(key: String): Promise<any> {
        const theKey = this.CACHE_PREFIX + key
        const exprKey = this.CACHE_EXPIRATION_PREFIX + key
        return new Promise((resolve, reject) => {
            return AsyncStorage.getItem(exprKey).then((expiry) => {
                if (expiry && this.currentTimeInMinutes() >= parseInt(expiry, 10)) {
                    AsyncStorage.multiRemove([exprKey, theKey])
                    return reject()
                }
                return AsyncStorage.getItem(theKey).then((item) => {
                    console.warn({ fromCache: item })
                    if (item) {
                        return resolve(JSON.parse(item))
                    }
                    return reject(undefined)
                })
            })
        })

    }

    public set(key: String, value: Response, time: number): Promise<void> {
        const theKey = this.CACHE_PREFIX + key
        const exprKey = this.CACHE_EXPIRATION_PREFIX + key
        if (time) {
            return AsyncStorage.setItem(exprKey, (this.currentTimeInMinutes() + time).toString()).then(() => {
                return AsyncStorage.setItem(theKey, JSON.stringify(value))
            })
        } else {
            AsyncStorage.removeItem(exprKey)
            return AsyncStorage.setItem(theKey, JSON.stringify(value))
        }
    }

    public remove(key: String): Promise<void> {
        return AsyncStorage.multiRemove([this.CACHE_EXPIRATION_PREFIX + key, this.CACHE_PREFIX + key])
    }

    public isExpired(key: String): Promise<any> {
        const exprKey = this.CACHE_EXPIRATION_PREFIX + key
        return new Promise((resolve, reject) => {
            return AsyncStorage.getItem(exprKey).then((expiry) => {
                const expired = expiry && this.currentTimeInMinutes() >= parseInt(expiry, 10)
                return expired ? resolve() : reject()
            })
        })
    }

    public flush(): Promise<void> {
        return AsyncStorage.getAllKeys().then((keys) => {
            const theKeys = keys.filter((key) => {
                return key.indexOf(this.CACHE_PREFIX) === 0 || key.indexOf(this.CACHE_EXPIRATION_PREFIX) === 0
            })
            return AsyncStorage.multiRemove(theKeys)
        })
    }

    public all(): Promise<void> {
        return AsyncStorage.getAllKeys().then((keys) => {
            const theKeys = keys.filter((key) => {
                return key.indexOf(this.CACHE_PREFIX) === 0 || key.indexOf(this.CACHE_EXPIRATION_PREFIX) === 0
            })
            return console.warn({ theKeys })
        })
    }

    public flushExpired(): Promise<any> {
        return AsyncStorage.getAllKeys().then((keys) => {
            keys.forEach((key) => {
                if (key.indexOf(this.CACHE_EXPIRATION_PREFIX) === 0) {
                    const exprKey = key
                    return AsyncStorage.getItem(exprKey).then((expiry) => {
                        if (expiry && this.currentTimeInMinutes() >= parseInt(expiry, 10)) {
                            const theKey = this.CACHE_PREFIX + key.replace(this.CACHE_EXPIRATION_PREFIX, '')
                            return AsyncStorage.multiRemove([exprKey, theKey])
                        }
                        return Promise.resolve()
                    })
                }
                return Promise.resolve()
            })
        })
    }

    private currentTimeInMinutes() {
        return Math.floor((new Date().getTime()) / this.EXPIRY_UNITS)
    }

}

export default new CacheStore()
