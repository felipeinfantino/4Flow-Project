import React from "react";

const initialState = {
    filterValue: "all",
    updateFilterStatePlaner: () => {},
};

export const FilterContext = React.createContext(initialState);

export const filterOptions = {
    ALL: "all",
    WEEK: "week",
    MONTH: "month",
    HALF_YEAR: "half year",
    YEAR: "year",
};