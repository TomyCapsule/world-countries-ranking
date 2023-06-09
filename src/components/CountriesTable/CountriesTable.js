import styles from "./CountriesTable.module.css";
import downArrow from "../../../public/down-arrow.png";
import upArrow from "../../../public/up-arrow.png";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

const orderBy = (countries, value, direction) => {
  if (direction === "asc")
    return [...countries].sort((a, b) => {
        if(value === 'name') return a.name.common > b.name.common ? 1 : -1;
        if(value === 'gini') return getGini(a) > getGini(b) ? 1 : -1
        return a[value] > b[value] ? 1 : -1
    }
    );
  if (direction === "desc")
    return [...countries].sort((a, b) => {
        if(value === 'name') return a.name.common > b.name.common ? -1 : 1;
        if(value === 'gini') return getGini(a) > getGini(b) ? -1 : 1
        return a[value] > b[value] ? -1 : 1
    }
    );
};

const getGini = (country) => {
  return country.gini ? country.gini[Object.keys(country.gini)[0]] : 0;
}

const SortArrow = ({direction}) => {
  return <Image src={direction === 'desc' ? downArrow : upArrow} alt="sortArrow" width={20} height={20} style={{marginLeft: '5px'}} />
}

const CountriesTable = ({ countries }) => {
    const [direction, setDirection] = useState('desc');
    const [value, setValue] = useState();

  const orderedCountries = orderBy(countries, value, direction);

  const switchDirection = () => {
    if (direction === 'desc') setDirection("asc");
    else if (direction === 'asc') setDirection("desc");
    else setDirection(null);
  }

  const setValueAndDirection = (value) => {
    switchDirection();
    setValue(value);
  }

  return (
    <div>
      <div className={styles.heading}>

        <div className={styles.heading_flag}></div>

        <button className={styles.heading_name} onClick={() => setValueAndDirection("name")}>
          <div>Name</div>
          {value === 'name' && <SortArrow direction={direction}/>}
        </button>

        <button className={styles.heading_population} onClick={() => setValueAndDirection("population")}>
          <div>Population</div>
          {value === 'population' && <SortArrow direction={direction}/>}
        </button>

        <button className={styles.heading_area} onClick={() => setValueAndDirection("area")}>
          <div>Area (km<sup style={{fontSize: "0.5rem"}}>2</sup>)</div>
          {value === 'area' && <SortArrow direction={direction}/>}
        </button>

        <button className={styles.heading_gini} onClick={() => setValueAndDirection("gini")}>
          <div>Gini</div>
          {value === 'gini' && <SortArrow direction={direction}/>}
        </button>
      </div>

      {orderedCountries.map((country, idx) => (
        <Link href={`/country/${country.ccn3}`} key={idx}>
          <div  className={styles.row}>
            <div className={styles.flag}>
              <img src={country.flags.svg} alt={country.name.common}/>
            </div>

            <div className={styles.name}>{country.name.common}</div>
            <div className={styles.population}>{country.population}</div>
            <div className={styles.area}>{country.area || 0}</div>
            <div className={styles.gini}>{country.gini ? country.gini[Object.keys(country.gini)[0]] : 0} %</div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CountriesTable;
