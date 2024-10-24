// Add this script to dev tools executer scripts when oppened dating tab
// Exec on site vk.com/dating

const LIKEQUERY = "div[aria-label=like]";

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

const sleep = delay => new Promise( r => setTimeout(r, delay));

function getElement(query, timeout){
    return checker(function(){ return document.querySelector(query)}, 100, timeout);
}

function isAnother(query, el){
    return checker(async function(){
        const elNew = await getElement(query, 5000);
        return elNew !== el;
    }, 100, 5000);
}

while(true){
    let like = await getElement(LIKEQUERY, 5000);
    if(!like)
        break;
    
    like.click();
    if(await isAnother(LIKEQUERY, like))
        sleep(500);
}
