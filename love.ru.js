// Add this script to dev tools executer scripts when oppened profile in dating tab
// Exec on site love.ru/znakomstva

const YESQUERY = "#sympathy_btn_send";
const BUTTONTIMEOUT = 5000;
const WAITCLICK = 2000;

function sleep(delay){
  return new Promise( r => r(setTimeout(delay)));
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

let yesButton;
while(yesButton = await getButton(YESQUERY)){

    await sleep(WAITCLICK);    
    yesButton.click();

}
