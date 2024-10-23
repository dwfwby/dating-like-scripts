// Add this script to dev tools executer scripts when oppened tab with list of your likes
// Exec on site loveplanet.ru/a-look

const LOADERTIMEOUT = 5000;

function getLoader(){
    return new Promise((resolve, reject) => {
        const startTime = new Date().getTime();
        setInterval(() => {
            const time = new Date().getTime()
            let loader = document.querySelector("#scroll_shift");
            if(loader)
                resolve(loader)
            else if(time - startTime >= LOADERTIMEOUT)
                resolve();
        }, 100)
    })
}

let loader;
while(loader = await getLoader()){
    if(loader.value)
        window.scrollTo(0, document.body.scrollHeight);
    else{
        const elites = document.querySelectorAll(".elite");
const list = Array.from(elites).map((e) => e.querySelector(".btn").href);
        console.log(list);
        break;
    }
}
