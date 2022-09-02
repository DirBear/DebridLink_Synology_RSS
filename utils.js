
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dev"];

function getRFC822_Date(date){
    let string = `${days[date.getUTCDay()]}, ${date.getUTCDate().toString().padStart(2, "0")} ` +
        `${month[date.getUTCMonth()]} ${date.getFullYear()} ` +
        `${date.getUTCHours().toString().padStart(2, "0")}:${date.getUTCMinutes().toString().padStart(2, "0")}:${date.getUTCSeconds().toString().padStart(2, "0")} GMT`
    return string;
}

module.exports = {getRFC822_Date}