import Link from 'next/link';
import allCities from '../data/citylist'
import styles from '../styles/Navbar.module.css'

export default function NavBar() {
    return (
        <div className={styles.container}>
            <Link href="/scenicSpot"><a className={styles.linkItem}>全部景點</a></Link>
            { allCities.map(([cityCode, cityName]) =>
                <Link href={`/scenicSpot/${cityCode}`} key={cityCode}><a className={styles.linkItem}>{cityName}</a></Link>) }
        </div>
    )
};