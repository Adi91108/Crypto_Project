import React, { useState, useEffect } from "react";
import axios from "axios";

import Header from "../components/Common/Header";
import TabsComponent from "../components/Dashboard/Tabs";
import Search from "../components/Dashboard/Search";
import PaginationComponent from "../components/Dashboard/PaginationComponent";
import Loader from "../components/Common/Loader";
import BackToTop from "../components/Common/BackToTop";
import { get100Coins } from "../functions/get100Coins";


function DashboardPage() {
    // for setting and manupulating the 100 coins data 
    const [coins, setCoins] = useState([]);
    // use  to show result of 10 coins per page and to switch b/w pages nd keep track of coins per page.
    const [paginatedCoins, setpaginatedCoins] = useState([]);
    // for searching and filtering the coins as per user demand 
    const [search, setSearch] = useState("");
    // count the pages keep track of pages in the application nd help in algo dev.
    const [page, setPage] = useState(1);
    // it is used to give feel of loading the page in the mean time when api or data is taking time to fetch.
    const [isLoading, setIsLoading] = useState(true);

    // use to get 10 coins per page heres the algo value is initial page
    const handlePageChange = (event, value) => {
        setPage(value);
        var previousIndex = (value - 1) * 10;
        setpaginatedCoins(coins.slice(previousIndex, previousIndex + 10));
    };

    const onSearchChange = (e) => {
        // console.log(e.target.value);
        setSearch(e.target.value);
    }

    // it allow us to filter the coins by name or symbol we use lowercase fn to show data in any case the user provide 
    // Input.
    var filteredCoins = coins.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
        || item.symbol.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        getData()
    }, []);

    const getData = async () => {
        const myCoins = await get100Coins();
        if (myCoins) {
            setCoins(myCoins);
            setpaginatedCoins(myCoins.slice(0, 10));
            setIsLoading(false);
        }
    }

    return (
        <>
            {/* <Header /> */}
            <BackToTop />
            {
                isLoading ? (
                    <Loader />
                ) : (
                    <div>
                        <Search search={search} onSearchChange={onSearchChange} />
                        {/* so here we use ternary ope to help the use to get result as per requirement i.e filter coin using
                        search bar or paginated coins as normal output */}
                        <TabsComponent coins={search ? filteredCoins : paginatedCoins} />
                        {!search && (
                            <PaginationComponent page={page} handlePageChange={handlePageChange} />
                        )}
                    </div>
                )
            }
        </>
    )
};

export default DashboardPage;