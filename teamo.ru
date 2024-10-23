// Add this script to dev tools executer scripts when oppened profile in dating tab

const NEXTQUERY = ".profile-switcher-button.profile-switcher-button_next";
const YESQUERY = ".faces-voter__button_yes";
const BUTTONTIMEOUT = 5000;
const WAITLIKE = 500;


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

let nextButton;
while(nextButton = await getButton(NEXTQUERY)){
    const yesButton = await getButton(YESQUERY));
    if(!yesButton)
        break;
    
    yesButton.onclick = async function(){
        await new Promise((resolve, reject) => resolve(setTimeout(WAITLIKE)))
        nextButton.click();
    }
    yesButton.click();

}
