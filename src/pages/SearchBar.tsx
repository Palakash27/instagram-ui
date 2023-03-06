import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import SearchTextResults from "../components/SearchTextResults";
import { useDebounce } from "../utils/hooks";

export default function SearchBar() {
    const [searchText, setSearchText] = useState("");
    const navigate = useNavigate();

    const debouncedSearchText = useDebounce(searchText);
    return (
        <StyledSearchBar>
            <div className="search">
                <input
                    type="text"
                    placeholder="Search"
                    autoFocus
                    onChange={(e) => setSearchText(e.target.value)}
                    value={searchText}
                />
                <button onClick={() => navigate("/explore")}>Cancel</button>
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
        input {
            width: 100%;
            height: 2rem;
            border: 1px solid #dbdbdb;
            border-radius: 0.5rem;
            padding: 1rem;
            font-size: 1rem;
            font-weight: 400;
            background-color: #fafafa;
        }
        button {
            border: none;
            background-color: #fff;
            color: #0095f6;
            font-size: 1rem;
            font-weight: 400;
            padding: 0 0 0 0.5rem;
        }
    }
    .user-list {
        margin: 0;
        padding: 0;
        list-style: none;
        height: 95%;
        .user-item {
            display: flex;
            align-items: center;
            padding: 0.5rem 0;
            img {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                border: 1px solid #dbdbdb;
                margin: 0 1rem;
            }
            .username {
                p {
                    margin: 0;
                    font-size: 1rem;
                    font-weight: 400;
                }
                p:first-child {
                    font-weight: 600;
                }
                p:last-child {
                    font-weight: 400;
                    color: #8e8e8e;
                }
            }
        }
    }
`;
