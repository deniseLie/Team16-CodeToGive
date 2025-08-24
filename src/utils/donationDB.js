import { openDB } from 'idb';

const DB_NAME = 'donationDB';
const STORE_NAME = 'donations';

export async function getDB() {
    return await openDB(DB_NAME, 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
            }
        },
    });
}

// Save a video Blob
export async function saveDonation(donationData) {
    const db = await getDB();
    await db.add(STORE_NAME, donationData);
}

// Get all donation videos
export async function getAllDonations() {
    const db = await getDB();
    return db.getAll(STORE_NAME);
}

// Delete a donation by ID
export async function deleteDonation(id) {
    const db = await getDB();
    await db.delete(STORE_NAME, id);
}
