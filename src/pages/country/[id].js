import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import styles from "./Country.module.css";

const getCountry = async (id) => {
    const res = await fetch(`https://restcountries.com/v3.1/alpha/${id}`);
    const country = await res.json();
    return country;
}

const Country = ({country}) => {
    
    const [borders, setBorders] = useState([])
    console.log(borders)
    useEffect(() => {
        const getBorders = async () => {
            if(country.borders){
                const borders = await Promise.all(country.borders.map((border) => getCountry(border)));
                setBorders(borders);
            }
        }
        getBorders();
    },[])
    
    return (
        <Layout title={country.name.common}>
            <div className={styles.container}>
                <div className={styles.container_left}>
                    <div className={styles.overview_panel} style={{position:'relative'}}>
                        <img src={country.flags.svg} alt="flag"/>

                        <h1 className={styles.overview_name}>{country.name.common}</h1>
                        <div className={styles.overview_region}>{country.region}</div>

                        <div className={styles.overview_numbers}>
                            <div className={styles.overview_population}>
                                <div className={styles.overview_value}>{country.population}</div>
                                <div className={styles.overview_label}>Population</div>
                            </div>

                            <div className={styles.overview_area}>
                                <div className={styles.overview_value}>{country.area}</div>
                                <div className={styles.overview_label}>Area</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.container_right}>
                    <div className={styles.details_panel}>
                        <h4 className={styles.details_panel_heading}>Details</h4>

                        <div className={styles.details_panel_row}>
                            <div className={styles.details_panel_label}>Capital</div>
                            <div className={styles.details_panel_value}>{country.capital}</div>
                        </div>

                        <div className={styles.details_panel_row}>
                            <div className={styles.details_panel_label}>Subregion</div>
                            <div className={styles.details_panel_value}>{country.subregion ?? "N/A"}</div>
                        </div>

                        <div className={styles.details_panel_row}>
                            <div className={styles.details_panel_label}>Languages</div>
                            <div className={styles.details_panel_value}>{Object.keys(country.languages).map((code) => country.languages[code]).join(", ")}</div>
                        </div>

                        <div className={styles.details_panel_row}>
                            <div className={styles.details_panel_label}>Currencies</div>
                            <div className={styles.details_panel_value}>{Object.keys(country.currencies).map((code) => country.currencies[code].name).join(", ")}</div>
                        </div>

                        <div className={styles.details_panel_row}>
                            <div className={styles.details_panel_label}>Native names</div>
                            <div className={styles.details_panel_value}>{Object.keys(country.name.nativeName).map((code) => country.name.nativeName[code].common).join(", ")}</div>
                        </div>

                        <div className={styles.details_panel_row}>
                            <div className={styles.details_panel_label}>Gini</div>
                            <div className={styles.details_panel_value}>{country.gini ? Object.keys(country.gini).map((code) => country.gini[code]) + '%' : 'N/A'}</div>
                        </div>

                        <div className={styles.details_panel_borders}>
                            <div className={styles.details_panel_label}>Neighbour Countries</div>
                            <div className={styles.details_panel_borders_container}>
                                {borders.map((country, idx) => 
                                    <div key={idx} className={styles.details_panel_borders_country}>
                                        <img src={country[0].flags.svg} alt={country[0].name.common} />
                                        <div className={styles.details_panel_borders_name}>{country[0].name.common}</div>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
                
                
                
            </div>
        </Layout>
    )
}

export const getServerSideProps = async ({params}) => {
    const country = await getCountry(params.id);
    return {
        props: {
            country: country[0]
        }
    }
}

export default Country;