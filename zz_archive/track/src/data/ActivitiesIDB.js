const DB_STORE = 'activities'
const DB_VERSION = 3

let db

const init_db = () => {
	return new Promise((resolve, reject) => {
		const req = window.indexedDB.open(DB_STORE, DB_VERSION)
		req.onerror = (e) => reject('db error:', e.target.errorCode)
		req.onsuccess = (e) => {
			db = e.target.result
			resolve()
		}
		req.onupgradeneeded = (e) => {
			const store = e.currentTarget.result.createObjectStore(
				DB_STORE, { keyPath: 'id', autoIncrement: true }
			)
			store.createIndex('type', 'type', { unique: false })
			store.createIndex('time', 'time', { unique: false })
			store.createIndex('data', 'data', { unique: false })
		}
	})
}

const get_all = () => {
	return new Promise((resolve, reject) => {
		const tx = db.transaction([DB_STORE], 'readonly')
		const store = tx.objectStore(DB_STORE)
		const req = store.getAll()
		req.onsuccess = () => resolve(req.result)
		req.onerror = () => reject('Could not get activities')
	})
}

const get_id = (id) => {
	return new Promise((resolve, reject) => {
		const tx = db.transaction([DB_STORE], 'readonly')
		const store = tx.objectStore(DB_STORE)
		const req = store.get(id)
		req.onsuccess = () => resolve(req.result)
		req.onerror = () => reject('Could not get activity')
	})
}

// get_date('09-25-2022')
const get_date = (date) => {
    return new Promise((resolve, reject) => {
        const date = new Date(dateString + "T00:00:00");
        const nextDay = new Date(date);
        nextDay.setDate(nextDay.getDate() + 1);
        const range = IDBKeyRange.bound(date, nextDay, false, true);
        const tx = db.transaction(DB_STORE, 'readonly')
        const store = tx.objectStore(DB_STORE)
        const index = store.index('time')
        const req = index.getAll(range)
        req.onsuccess = () => resolve(req.result)
        req.onerror = () => reject('Error searching by date')
    })
}

const insert = (activity) => {
	return new Promise((resolve, reject) => {
		const tx = db.transaction([DB_STORE], 'readwrite')
		const store = tx.objectStore(DB_STORE)
		const req = store.add(activity)
		req.onsuccess = () => resolve('Inserted successfully')
		req.onerror = () => reject('Error inserting')
		tx.onerror = () => reject('Transaction error')
	})
}

const update_id = (id, activity) => {
	return new Promise((resolve, reject) => {
		const tx = db.transaction([DB_STORE], 'readwrite')
		const store = tx.objectStore(DB_STORE)
		const req = store.put({ ...activity, id })
		req.onsuccess = () => resolve('Updated successfully')
		req.onerror = () => reject('Error updating')
	})
}

const delete_id = (id) => {
	return new Promise((resolve, reject) => {
		const tx = db.transaction([DB_STORE], 'readwrite')
		const store = tx.objectStore(DB_STORE)
		const req = store.delete(id)
		req.onsuccess = () => resolve('Deleted successfully')
		req.onerror = () => reject('Error deleting')
	})
}

const delete_all = () => {
	return new Promise((resolve, reject) => {
		const tx = db.transaction([DB_STORE], 'readwrite')
		const store = tx.objectStore(DB_STORE)
		const req = store.clear()
		req.onsuccess = () => resolve('Deleted all successfully')
		req.onerror = () => reject('Error deleting all')
	})
}

export {
	db,
	init_db,
	get_all,
	get_id,
	get_date,
	insert,
	update_id,
	delete_id,
	delete_all
}
