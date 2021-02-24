import jsSHA from 'jssha';

const getAuthorizationHeader = () => {
    // Get authorization header for MOTC API. 
    let AppID = '947333329b9a4c99adc478a8c12c3aa3';
    let ApiKey = 'un_vUIhkEV9MEwUC5P3A8PLIZm0';

    let GMTString = new Date().toGMTString();
    let ShaObj = new jsSHA('SHA-1', 'TEXT');
    ShaObj.setHMACKey(ApiKey, 'TEXT');
    ShaObj.update(`x-date: ${GMTString}`);
    let HMAC = ShaObj.getHMAC('B64');
    let Authorization = `hmac username="${AppID}", algorithm="hmac-sha1", headers="x-date", signature="${HMAC}"`;
    return {
        Authorization: Authorization,
        'X-Date': GMTString
    }
}

export default getAuthorizationHeader;