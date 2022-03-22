import AsyncStorage from '@react-native-async-storage/async-storage'

interface AsyncStorageType {
  storeData: (key: string, value: any) => Promise<void>
  getStoreData: (key: string, objectExpected?: boolean) => Promise<any>
  deleteStoreData: (key: string) => Promise<void>
}

/**
 * save data to storage
 * @param {string} key store key id
 * @param {any} value value to store
 */
const storeData = (key: string, value: any): Promise<void> =>
  new Promise<void>(async (resolve, reject) => {
    try {
      if (typeof value === 'object') {
        value = JSON.stringify(value)
      }
      await AsyncStorage.setItem(key, value)
      resolve()
    } catch (error: Error | any) {
      reject(error)
    }
  })

/**
 * get stored data
 * @param {string} key store key id
 * @param {boolean} objectExpected id object return expected
 * @returns {any}
 */
const getStoreData = (key: string, objectExpected: boolean = false): Promise<any> =>
  new Promise<any>(async (resolve, reject) => {
    try {
      let value: string | null = await AsyncStorage.getItem(key)
      if (value && objectExpected) {
        value = JSON.parse(value)
      }
      resolve(value)
    } catch (error: Error | any) {
      reject(error)
    }
  })

/**
 * remove stored data
 * @param {string} key store key id
 * @param {boolean} objectExpected id object return expected
 * @returns {any}
 */
const deleteStoreData = (key: string): Promise<void> =>
  new Promise<void>(async (resolve, reject) => {
    try {
      await AsyncStorage.removeItem(key)
      resolve()
    } catch (error: Error | any) {
      reject(error)
    }
  })

const storage: AsyncStorageType = {storeData, getStoreData, deleteStoreData}

export default storage
