import { AsyncStorage } from 'react-native'

const CACHE_PREFIX = 'cachestore-'
const CACHE_EXPIRATION_PREFIX = 'cacheexpiration-'
const EXPIRY_UNITS = 60 * 1000 // Time resolution in minutes

function currentTime() {
    return Math.floor((new Date().getTime()) / EXPIRY_UNITS)
}

const CacheStore = {
    get(key: String): Promise<any> {
        const theKey = CACHE_PREFIX + key
        const exprKey = CACHE_EXPIRATION_PREFIX + key
        return AsyncStorage.getItem(exprKey).then((expiry) => {
            if (expiry && currentTime() >= parseInt(expiry, 10)) {
                AsyncStorage.multiRemove([exprKey, theKey])
                return Promise.reject(undefined)
            }
            return AsyncStorage.getItem(theKey).then((item) => {
                console.warn({ item })
                if (item) {
                    return Promise.resolve(JSON.parse(item))
                }
                return Promise.reject(undefined)
            })
        })
    },

    set(key: String, value: Response, time: number): Promise<any> {
        const theKey = CACHE_PREFIX + key
        const exprKey = CACHE_EXPIRATION_PREFIX + key
        if (time) {
            return AsyncStorage.setItem(exprKey, (currentTime() + time).toString()).then(() => {
                return AsyncStorage.setItem(theKey, JSON.stringify(value))
            })
        } else {
            AsyncStorage.removeItem(exprKey)
            return AsyncStorage.setItem(theKey, JSON.stringify(value))
        }
    },

    remove(key: String): Promise<any> {
        return AsyncStorage.multiRemove([CACHE_EXPIRATION_PREFIX + key, CACHE_PREFIX + key])
    },

    isExpired(key: String): Promise<any> {
        const exprKey = CACHE_EXPIRATION_PREFIX + key
        return AsyncStorage.getItem(exprKey).then((expiry) => {
            const expired = expiry && currentTime() >= parseInt(expiry, 10)
            return expired ? Promise.resolve() : Promise.reject(null)
        })
    },

    flush(): Promise<any> {
        return AsyncStorage.getAllKeys().then((keys) => {
            const theKeys = keys.filter((key) => {
                return key.indexOf(CACHE_PREFIX) === 0 || key.indexOf(CACHE_EXPIRATION_PREFIX) === 0
            })
            return AsyncStorage.multiRemove(theKeys)
        })
    },

    flushExpired(): Promise<any> {
        return AsyncStorage.getAllKeys().then((keys) => {
            keys.forEach((key) => {
                if (key.indexOf(CACHE_EXPIRATION_PREFIX) === 0) {
                    const exprKey = key
                    return AsyncStorage.getItem(exprKey).then((expiry) => {
                        if (expiry && currentTime() >= parseInt(expiry, 10)) {
                            const theKey = CACHE_PREFIX + key.replace(CACHE_EXPIRATION_PREFIX, '')
                            return AsyncStorage.multiRemove([exprKey, theKey])
                        }
                        return Promise.resolve()
                    })
                }
                return Promise.resolve()
            })
        })
    },
}

// Always flush expired items on start time
CacheStore.flushExpired()

export default CacheStore
