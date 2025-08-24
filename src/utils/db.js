import { openDB } from 'idb';

const DB_NAME = 'diaryDB';
const STORE_NAME = 'diaries';

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
export async function saveDiary(blob) {
    console.log('blobcc', blob)
    const db = await getDB();
    await db.add(STORE_NAME, { blob, createdAt: new Date().toISOString() });
}

// Get all diary videos
export async function getAllDiaries() {
    const db = await getDB();
    return db.getAll(STORE_NAME);
}

// Delete a diary by ID
export async function deleteDiary(id) {
    const db = await getDB();
    await db.delete(STORE_NAME, id);
}
