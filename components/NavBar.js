import Link from 'next/link';
import allCities from '../data/citylist'
import styles from '../styles/Navbar.module.css'
import { useRouter } from 'next/router'

export default function NavBar() {
    /*
        Navigation Bar on top of each page.
        position: sticky
    */
    return (
        <nav className={styles.container}>
            <Logo />
            <CityDropdown />
        </nav>
    )
};

function CityDropdown() {
    /*
        Dropdown list for switching between different city.
        Each value of the dropdown list is the relative path of specific city.
    */
    const router = useRouter();
    const handleDropdownChanged = (e) => {
        const destinationRoute = e.target.value;
        router.push(destinationRoute);
    }
    return (
        <div className={styles.dropdownWrapper}>
            <select className={styles.dropdown} onChange={handleDropdownChanged} value={`/scenicSpot/${router.query.city || ''}`}>
                <option key='notselected' value='notselected' disabled>選擇縣市</option>
                <option key='All' value='/scenicSpot/'>全部</option>
                {allCities.map(([cityCode, cityName]) =>
                    <option key={cityCode} value={`/scenicSpot/${cityCode}`}>{cityName}</option>)}
            </select>
        </div>
    )
}

function Logo() {
    /*
        Logo to be shown on the left side of NavBar
    */
    return (
        <Link href='/'>
            <a className={styles.logo}>
                Tourism
            </a>
        </Link>
    )
}