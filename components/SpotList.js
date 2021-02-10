import { useState, useEffect } from 'react'
import axios from 'axios';
import getAuthorizationHeader from '../utils/apiAuth'
import styles from '../styles/SpotList.module.css'
import { getDisplayName } from 'next/dist/next-server/lib/utils';

export default function SpotList({ spots, url }) {
    /*
        A list of spots for specific city.
        Props
            spots: array of spots info (e.g. Name, Description, ...)
            url: baseUrl for fetching more spots
    */

    // State of further spots
    const [moreSpots, setMoreSpots] = useState([]);
    // State of whether reached the end and no more spots.
    const [isEndOfList, setEndOfList] = useState(false);

    //Effect for fetching spots when user scroll to the bottom of page.
    //Trigger every time when moreSpots has changed.
    useEffect(() => {
        const getMoreSpots = () => {
            if (!isEndOfList && (window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                axios.get(`${url}&$skip=${moreSpots.length + 30}`, {
                    headers: getAuthorizationHeader(),
                }).then(response => {
                    const spotsData = response.data;
                    if (spotsData.length > 0)
                        setMoreSpots(oldSpots => [...oldSpots, ...spotsData]);
                    else
                        setEndOfList(true);
                }).catch(err => console.error(err));

                //Remove EventListener once user arrived bottom of page.
                //Avoiding duplicated and continuous requests to be sent.
                window.removeEventListener('scroll', getMoreSpots);
            }
        };
        window.addEventListener('scroll', getMoreSpots);

        //Cleanup function
        return () => {
            window.removeEventListener('scroll', getMoreSpots);
        }
    }, [moreSpots])

    return (
        <div className={styles.spotlist}>
            {spots.map(spot =>
                <Spot spotInfo={spot} key={spot.ID} />
            )}
            {moreSpots.map(spot =>
                <Spot spotInfo={spot} key={spot.ID} />
            )}
            {isEndOfList || <div className={styles.loadmorePlaceholder}>下滑以查看更多</div>}
        </div>
    )
}

function Spot({ spotInfo }) {
    /*
        Spot item in the spot list.
        Props
            spotInfo: spots info (e.g. Name, Description, ...)
    */
    useEffect(() => {
        console.log('rerender');
    });
    return (
        <div className={styles.spot}>
            <SpotPictures pictures={spotInfo.Picture} />
            <h3>{spotInfo.Name}</h3>
            <p>{spotInfo.Description}</p>
            <table className={styles.details}>
                <tbody>
                    <tr>
                        <td valign="top">&#128205;</td>
                        <td>
                            <a href={spotInfo.MapUrl || `https://www.google.com/maps?q=${spotInfo.Address}`} target='_blank'>{spotInfo.Address}</a>
                        </td>
                    </tr>
                    <tr>
                        <td valign="top">&#128222;</td>
                        <td>{<a href={`tel:${spotInfo.Phone}`}>{spotInfo.Phone}</a>}</td>
                    </tr>
                    <tr>
                        <td valign="top">&#127759;</td>
                        <td>{spotInfo.WebsiteUrl ? <a href={spotInfo.WebsiteUrl} target='_blank'>{spotInfo.WebsiteUrl}</a> : '--'}</td>
                    </tr>
                    <tr>
                        <td valign="top">&#128337;</td>
                        <td>{spotInfo.OpenTime}</td>
                    </tr>
                    <tr>
                        <td valign="top">&#128652;</td>
                        <td>{spotInfo.TravelInfo || '--'}</td>
                    </tr>
                    {!spotInfo.TicketInfo ||
                        <tr>
                            <td valign="top">&#127903;</td>
                            <td>{spotInfo.TicketInfo}</td>
                        </tr>}
                    {!spotInfo.Remarks ||
                        <tr>
                            <td valign="top">&#9888;</td>
                            <td>{spotInfo.Remarks}</td>
                        </tr>}
                </tbody>
            </table>
        </div>
    )
}

function SpotPictures({ pictures }) {
    // Unzip Picture Object.
    let pics = [pictures.PictureUrl1, pictures.PictureUrl2, pictures.PictureUrl3];

    // Get set of picture url(some of the url provided by API are duplicated)
    // and filter empty string result.
    pics = [...new Set(pics)].filter(pic => pic);
    return (
        <>
            {
                pics.map(url =>
                    <a href={url} key={url} target='_blank'><img src={url} className={styles.picture}></img></a>
                )
            }
        </>
    )
}