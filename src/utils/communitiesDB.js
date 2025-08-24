import { openDB } from 'idb';

const DB_NAME = 'communitiesDB';
const STORE_NAMES = {
  schools: 'schools',
  districts: 'districts',
};

export async function getDB() {
    return await openDB(DB_NAME, 1, {
        upgrade(db) {
           // Create "schools" store if not exists
            if (!db.objectStoreNames.contains(STORE_NAMES.schools)) {
                db.createObjectStore(STORE_NAMES.schools, { keyPath: 'id', autoIncrement: true });
            }

            // Create "districts" store if not exists
            if (!db.objectStoreNames.contains(STORE_NAMES.districts)) {
                db.createObjectStore(STORE_NAMES.districts, { keyPath: 'id', autoIncrement: true });
            }
        },
    });
}

// Get all communities
export async function getAll(storeName) {
    const db = await getDB();
    return await db.getAll(storeName);
}

// Save a community by ID 
export async function saveCommunity(storeName, data) {
    const db = await getDB();
    return await db.add(storeName, data);
}

// Delete a community by ID
export async function deleteCommunity(storeName, id) {
    const db = await getDB();
    return await db.delete(storeName, id);
}

// Edit community by ID
export async function editCommunity(storeName, id, data) {
    const db = await getDB();
    await db.put(storeName, { ...data, id: id });
}