import React, {useReducer} from "react";

const initialState = {
    filterValue: "all"
};

export const FilterContext = React.createContext(initialState);

export const filterOptions = {
    ALL: "all",
    WEEK: "week",
    MONTH: "month",
    HALF_YEAR: "half year",
    YEAR: "year",
};

const reducer = (state, action) => {
    switch (action.type) {
        case "WEEK":
            return {
                ...state,
                filterValue: filterOptions.WEEK
            };
        case "MONTH":
            return {
                ...state,
                filterValue: filterOptions.MONTH
            };
        case "HALF_YEAR":
            return {
                ...state,
                filterValue: filterOptions.HALF_YEAR
            };
        case "YEAR":
            return {
                ...state,
                filterValue: filterOptions.YEAR
            };
        default:
            return state;
    }
};


export const FilterProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <FilterContext.Provider value={{state, dispatch}}>
            {children}
        </FilterContext.Provider>
    );
};