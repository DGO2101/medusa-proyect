// the scheduled-job function
export default function () {
    console.log("Time to say hello world!")
  }
  
  // the job's configurations
  export const config = {
    name: "every-minute-message",
    // execute every minute
    schedule: "* * * * *", //cada asterisco significa un periodo de tiempo en el que mandara un mensaje a la consola
  }