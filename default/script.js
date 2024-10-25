async function sdf34dsf(){
    async function setIntervalMax(callback, delay, timeout){    
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
        return setIntervalMax(function(){ return document.querySelector(query)}, 100, timeout);
}
    
    function onChange(callback, old, timeout){
        return setIntervalMax(async function(){ 
            const res = await callback();
            
            return res != old && res;
        }, 100, timeout);
    }
    
    const sleep = delay => new Promise( r => setTimeout(r, delay))
    
    const getCompared = async () => (await getElement(config.comparedquery, config.comparedtimeout))?.outerHTML;
    
    let compared, newCompared, yesButton;
    
    const hasNewCompared = () => onChange(async () => await getCompared(), compared, config.comparedtimeout);
    
    while(newCompared = await hasNewCompared()){
        yesButton = await getElement(config.yesquery, config.elementtimeout);

        if(!yesButton && config.skipquery)
            yesButton = await getElement(config.skipquery, config.elementtimeout);
        
        if(!yesButton)
            break;
        
        compared = newCompared;
        
        await sleep(config.waitlike);
        yesButton.click();
    }
}

sdf34dsf();
