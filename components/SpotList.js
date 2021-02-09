import { useState, useEffect } from 'react'
import axios from 'axios';
import getAuthorizationHeader from '../utils/apiAuth'

export default function SpotList({ spots, url }) {  
    // State of further spots
    const [moreSpots, setMoreSpots] = useState([]);

    //Effect for fetching spots when user scroll to the bottom of page.
    //Trigger every time when moreSpots has changed.
    useEffect(() => {
        const getMoreSpots = () => {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                axios.get(`${url}&$skip=${moreSpots.length + 30}`, {
                    headers: getAuthorizationHeader(),
                }).then(response => {
                    const spotsData = response.data;
                    setMoreSpots(oldSpots => [...oldSpots, ...spotsData]);
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
        <>
            <ul>
                {spots.map(spot =>
                    <li key={spot.ID}>
                        <h3>{spot.Name} ||| {spot.Description}</h3>
                    </li>
                )}
            </ul>
            <ul>
                {moreSpots.map(spot =>
                    <li key={spot.ID}>
                        <h3>{spot.Name} ||| {spot.Description}</h3>
                    </li>
                )}
            </ul>
        </>
    )
}