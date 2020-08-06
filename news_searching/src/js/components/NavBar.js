import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux"
import {resetStateForNewSearchQuery} from "../AC";

export const NavBar = () => {

    const [searchValue, setSearchValue] = useState("");
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSearchInput = (ev) => {
        setSearchValue(ev.target.value);
    }

    const handleSearchButton = () => {
        dispatch(resetStateForNewSearchQuery());
        history.push(`/news/${searchValue}`);
    }

    return(
        <div className="navigation">
            <div className="search-bar">
                <Link to={"/profile"} className={"navigation__profile__profile-info-button"}>Profile</Link>
                <input
                    onChange={handleSearchInput}
                    value={searchValue}
                    type="text"
                    className="search-bar__input"
                    placeholder={"Search for news"}
                />
                <span onClick={handleSearchButton} className="search-bar__submit">Search</span>
            </div>
        </div>
    )

}