import { useRouter } from 'next/router'
import getAuthorizationHeader from '../../utils/apiAuth'
import axios from 'axios';
import SpotList from '../../components/SpotList'

export default function ScenicSpot({ spots, url }) {
    /*
        Props
            spots: array of top 30 spots fetched from MOTC API.
            url: baseUrl for fetching more spots, it's different depend on target city.
    */
   
    return (
        <>
            <SpotList spots={spots} url={url} />
        </>
    )
}

export async function getServerSideProps(context) {
    /*
        Fetch data from API and get all spots.
        Then return to page as props.

        Request Format:
            url: GET /cityspots/[city]
            params: None
            data: None
        Response Format:
            shape: [spot1, spot2, ...]
            spot: {
                name: string,
                description: string,
                ...
            }
    */
    const baseUrl = 'https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?$top=30';
    const spotsData = await axios.get(baseUrl, {
        headers: getAuthorizationHeader(),
    }).then(response => response.data)
        .catch(err => console.error(err));
    return {
        props: {
            spots: spotsData,
            url: baseUrl
        },
    }
}