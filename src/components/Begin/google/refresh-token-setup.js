export const refreshTokenSetup = (res)=>{
    
    let refreshTiming = (res.tokenObj.expires_in || 3600-5*60)*1000;
    
    const refreshToken = async ()=>{
        const newAuthRes = await res.reloadAuthResponse();
        refreshTiming = (newAuthRes.expires_in || 3600-5*60)*1000;
        console.log("new auth res:", newAuthRes);
        console.log("new auth token:", newAuthRes.id_token);
        
        //setup the other after timer
        setTimeout(refreshToken,refreshTiming);
    };
    
    //first refresh timer
    setTimeout(refreshToken,refreshTiming);
}