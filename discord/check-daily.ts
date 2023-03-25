import { exec } from 'child_process';
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




//setInterval(func, delay, arg0, arg1,  … , argN)

setInterval(() => {
  
  // Check if time of day is the desired time of day (down to a minute)

  // Time of day to execute
  
  // Time at setInterval callback 

  let now: Date = new Date

  let execute: String = "12:00"

  if( now.getHours() >= Number(execute.split(":")[0]) && now.getMinutes() >= Number(execute.split(":")[1]) ){
    console.log(now.getMinutes())
  }

}, 59 * 1000)