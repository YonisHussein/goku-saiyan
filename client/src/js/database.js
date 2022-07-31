import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Add text to indexedDB
export const putDb = async (content) => {
  const jateDB = await openDB ("JATE", 1)
  const transaction = jateDB.transaction("JATE", "readwrite")
  const store = transaction.objectStore("JATE")
  const request = store.put ({id: 1, value: content})
  const result = await request
  
  
  console.error('putDb implemented', result.value)};


// Retrive text from indexedDB
export const getDb = async () => {
  const jateDB = await openDB ("JATE", 1)
  const transaction = jateDB.transaction("JATE", "readonly")
  const store = transaction.objectStore("JATE")
  const request = store.get (1)
  const result = await request
  result ? console.log("Data retrieved"): console.log("No data retrieved")
  
  return result?.value 
}

initdb();
