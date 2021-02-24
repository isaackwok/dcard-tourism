import jsSHA from 'jssha';

const getAuthorizationHeader = () => {
    // Get authorization header for MOTC API. 
    let AppID = process.env.APP_ID;
    let AppKey = process.env.API_KEY;

    let GMTString = new Date().toGMTString();
    let ShaObj = new jsSHA('SHA-1', 'TEXT');
    ShaObj.setHMACKey(AppKey, 'TEXT');
    ShaObj.update(`x-date: ${GMTString}`);
    let HMAC = ShaObj.getHMAC('B64');
    let Authorization = `hmac username="${AppID}", algorithm="hmac-sha1", headers="x-date", signature="${HMAC}"`;
    return {
        Authorization: Authorization,
        'X-Date': GMTString
    }
}

export default getAuthorizationHeader;