import Link from 'next/link';
import allCities from '../data/citylist'
import styles from '../styles/Navbar.module.css'
import { useRouter } from 'next/router'

export default function NavBar() {
    return (
        <nav className={styles.container}>
            <Logo />
            {/* { allCities.map(([cityCode, cityName]) =>
                <Link href={`/scenicSpot/${cityCode}`} key={cityCode}><a className={styles.linkItem}>{cityName}</a></Link>) } */}
            <CityDropdown />
        </nav>
    )
};

function CityDropdown() {
    const router = useRouter();
    const handleDropdownChanged = (e) => {
        const destinationRoute = e.target.value;
        router.push(destinationRoute);
    }
    return (
        <div className={styles.dropdownWrapper}>
            <select className={styles.dropdown} onChange={handleDropdownChanged} value={`/scenicSpot/${router.query.city || ''}`}>
                <option key='All' value='/scenicSpot/'>全部</option>
                {allCities.map(([cityCode, cityName]) =>
                    <option key={cityCode} value={`/scenicSpot/${cityCode}`}>{cityName}</option>)}
            </select>
        </div>
    )
}

function Logo() {
    return (
        <Link href='/'>
            <a>
                <label className={styles.logo}>Tourism</label>
            </a>
        </Link>
    )
}