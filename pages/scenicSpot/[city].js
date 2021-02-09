import { useRouter } from 'next/router'
import getAuthorizationHeader from '../../utils/apiAuth'
import axios from 'axios';
import SpotList from '../../components/SpotList'

export default function CitySpot({ spots, url }) {
    return (
        <>
            <SpotList spots={spots} url={url} />
        </>
    )
}

export async function getServerSideProps(context) {
    /*
        Fetch data from API and get specific city's spots.
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
    const { city } = context.query;
    const baseUrl = `https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/${city}?$top=30`;
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