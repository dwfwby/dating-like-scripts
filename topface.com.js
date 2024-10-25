// Add this script to dev tools executer scripts when oppened dating tab
// Exec on site topface.com/dating/type/all/

const YESQUERY = ".js-btn-like";
const BUTTONTIMEOUT = 5000;
const WAITCLICK = 500;

function sleep(delay){
  return new Promise( r => setTimeout(r, delay));
}

function checker(callback, delay, timeout){
    return new Promise((resolve, reject) => {
        const startTime = new Date().getTime();
        setInterval(() => {
            const time = new Date().getTime();
            const result = callback();
            if(result)
                resolve(result)
            else if(time - startTime >= timeout)
                resolve();
        }, delay)
    })
}

function getElement(query, timeout){
    return checker(function(){ return document.querySelector(query)}, 100, timeout);
}

let yesButton;
while(yesButton = await getElement(YESQUERY, BUTTONTIMEOUT)){

    await sleep(WAITCLICK);    
    yesButton.click();

}
