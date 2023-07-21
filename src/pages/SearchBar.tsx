import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import SearchTextResults from "../components/SearchTextResults";
import { useDebounce } from "../utils/hooks";

export default function SearchBar() {
    const [searchText, setSearchText] = useState("");
    const inputRef = React.useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const debouncedSearchText = useDebounce(searchText);

    const handleCrossBtn = () => {
        setSearchText("");
        inputRef.current?.focus();
    };

    return (
        <StyledSearchBar>
            <div className="search">
                <input
                    type="text"
                    placeholder="Search"
                    autoFocus
                    onChange={(e) => setSearchText(e.target.value)}
                    value={searchText}
                    ref={inputRef}
                />
                <button className="cross-btn" onClick={handleCrossBtn}>
                    x
                </button>
                <button
                    className="cancel-btn"
                    onClick={() => navigate("/explore")}
                >
                    Cancel
                </button>
            </div>
            <SearchTextResults searchText={debouncedSearchText} />
            {/* <div>recent people</div> */}
        </StyledSearchBar>
    );
}

const StyledSearchBar = styled.div`
    padding: 0.5rem 1rem;
    height: 100%;

    .search {
        display: flex;
        height: 3%;
        position: relative;
        input {
            width: 100%;
            height: 2rem;
            border: 1px solid #dbdbdb;
            border-radius: 0.5rem;
            padding: 1rem;
            font-size: 1rem;
            font-weight: 400;
            background-color: #fafafa;
            text-align: center;
            transition: text-align 0.5s ease;
        }
        input:focus {
            text-align: left;
        }
        .cross-btn {
            border: none;
            background-color: #fafafa;
            color: black;
            font-size: 1rem;
            font-weight: 400;
            padding: 0 0 0 0.5rem;
            position: absolute;
            right: 15%;
            top: 25%;
        }
        .cancel-btn {
            border: none;
            background-color: #fff;
            color: #0095f6;
            font-size: 1rem;
            font-weight: 400;
            padding: 0 0 0 0.5rem;
        }
    }
`;
