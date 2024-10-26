async function sdf34dsf(){
    async function setIntervalMax(callback, delay, timeout){
        const startTime = new Date().getTime();
        let resolver, id;
        const promise = new Promise((r) => {
            resolver = r;
            id = setInterval(async () => {
                const time = new Date().getTime();
                const result = await callback();
                
                if(result)
                    resolver(result);
                else if(time - startTime >= timeout)
                    resolver(false);
            }, delay);
        });
        
        promise.then(() => clearInterval(id));
        
        return promise
    }
    
    function getElement(query, timeout){
        return setIntervalMax(function(){ return document.querySelector(query)}, 100, timeout);
}
    
    function onChange(callback, old, timeout){
        return setIntervalMax(async function(){ 
            const res = await callback();
            
            return [res !== old, res];
        }, 100, timeout);
    }
    
    const sleep = delay => new Promise( r => setTimeout(r, delay))
    
    const getCompared = async () => (await getElement(config.comparedquery, config.comparedtimeout))?.outerHTML;
    
    let compared, button;
    
    const hasNewCompared = () => onChange(async () => await getCompared(), compared, config.comparedtimeout);
    
    while(true){
        if(config.comparedquery){
            const [isNew, newCompared] = await hasNewCompared();
            
            if(!isNew)
                break;
            
            compared = compared;
        }

        if(config.limitquery){
            const limitEl = await getElement(config.limitquery, config.limittimeout);
            
            if(limitEl)
                break;
        }
            
        
        button = await getElement(config.yesquery, config.elementtimeout);

        if(!button && config.alternativequery){
            let resolver;
            const promise = new Promise( r => resolver = r );
            
            config.alternativequery.forEach((query, i) => {
                const searcher = getElement(query, config.elementtimeout);
                const isLast = i !== config.alternativequery.length - 1;
                
                searcher.then( v => (v || isLast) && resolver(v));
            })


            button = await promise;
        }
        
        if(!button)
            break;
        
        await sleep(config.waitlike);
        button.click();
    }
}

sdf34dsf();
