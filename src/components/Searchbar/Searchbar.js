import {useState} from 'react';
import PropTypes from 'prop-types';
import style from 'components/Searchbar/Searchbar.module.css'

const Searchbar = ({handleSearch}) => {
    
    const [searchValue, setSearchValue] = useState('');

    const handleChange = (e) => {
        const {value} = e.target;
        setSearchValue(value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSearch(searchValue);
    }
    
    return (
        <header className={style.Searchbar}>
            <form onSubmit={handleSubmit} className={style.SearchForm}>
                <input
                    className={style.SearchFormInput}
                    onChange={handleChange}
                    value={searchValue}
                    name="searchValue"
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                />
                <button type="submit" className={style.SearchFormButton}>
                    <span className={style.SearchFormButtonLabel}>Search</span>
                </button>
            </form>
        </header>
    )
}

export default Searchbar;

Searchbar.propTypes = {
    handleSearch: PropTypes.func.isRequired
}