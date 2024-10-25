async function sdf34dsf(){
    async function checker(callback, delay, timeout){
        let resolver;
        const promise = new Promise( r => resolver = r);
        const startTime = new Date().getTime();
        const id = setInterval(async () => {
            const time = new Date().getTime();
            const result = await callback();
            
            if(result)
                resolver(result);
            else if(time - startTime >= timeout)
                resolver();
            
        }, delay);
        
        await promise;
        clearInterval(id);
        return await promise;
    }
    
    function getElement(query, timeout){
        return checker(function(){ return document.querySelector(query)}, 100, timeout);
    }
    
    function waitDifference(callback, old, timeout){
        return checker(async function(){ 
            const res = await callback();
            
            return res != old && res;
        }, 100, timeout);
    }
    
    const sleep_ = delay => new Promise( r => setTimeout(r, delay))
    
    const getCompared = async () => (await getElement(config.comparedquery, config.comparedtimeout)).outerHTML;
    
    let compared, newCompared, yesButton;
    
    const hasNewCompared = () => waitDifference(async () => await getCompared(), compared, config.comparedtimeout);
    
    while((newCompared = await hasNewCompared()) && (yesButton = await getElement(config.yesquery, config.elementtimeout))){
        compared = newCompared;
        await sleep_(config.waitlike);
        yesButton.click();
    }
}

sdf34dsf();
