// Add this script to dev tools executer scripts when oppened profile in dating tab
// Exec on site loveplanet.ru/a-searchlik

const NOQUERY = "#likes-btn-no";
const YESQUERY = "#likes-btn-yes";
const BUTTONTIMEOUT = 5000;
const WAITCLICK = 2000;

function sleep(delay){
  return new Promise( r => setTimeout(r, delay));
}

function getButton(query){
    return new Promise((resolve, reject) => {
        const startTime = new Date().getTime();
        setInterval(() => {
            const time = new Date().getTime()
            let nextButton = document.querySelector(query);
            if(nextButton)
                resolve(nextButton)
            else if(time - startTime >= BUTTONTIMEOUT)
                resolve();
        }, 100)
    })
}

let noButton;
while(noButton = await getButton(NOQUERY)){
    const yesButton = await getButton(YESQUERY);
    await sleep(WAITCLICK);
    if(!yesButton){
        noButton.click();
        continue;
    }
    
    yesButton.click();

}
