import Image from "next/image";
import styles from "./SearchInput.module.css";
import SearchIcon from "../../../public/search.png";

const SearchInput = ({...rest}) => {
  return (
    <div className={styles.wrapper}>
      <Image src={SearchIcon} width={20} height={20} style={{color: 'inherit'}} />
      <input className={styles.input} {...rest}/>
    </div>
  );
};

export default SearchInput;
