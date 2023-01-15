import { PersistentStorage } from './storage'; // import PersistentStorage for storing URLs

const storage = new PersistentStorage();

function checkRecord(callback: () => void): void {
    const today = new Date();
    const dateKey = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    const existingUrl = storage.get(dateKey);
    if (!existingUrl) {
        storage.set(dateKey, "url not submitted");
        console.log("Record for today has not been submitted. Saved 'url not submitted'");
        callback();
    } else {
        console.log("Record for today has been submitted.");
    }
}

setInterval(() => checkRecord(() => {
    //callback function
    console.log("Executing callback function")
}), 60 * 1000); // run the function every minute
