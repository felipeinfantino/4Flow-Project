import React, {useContext, useState} from 'react';
import {Popover, ButtonGroup, Button} from 'react-bootstrap'
import {FilterContext} from "./FilterContext";


const TaskFilter = (props) => {
    const {dispatch} = useContext(FilterContext);

    const handleFilterChange = action => {
        dispatch({
            type: action
        });
    };

    return (
        <Popover {...props} id="popover-basic">
            <Popover.Title as="h3">Filter tasks</Popover.Title>
            <Popover.Content>
                <ButtonGroup aria-label="Basic example">
                    <Button variant="outline-secondary"
                            onClick={() => handleFilterChange("WEEK")}>week</Button>
                    <Button variant="outline-secondary"
                            onClick={() => handleFilterChange("MONTH")}>month</Button>
                    <Button variant="outline-secondary"
                            onClick={() => handleFilterChange("HALF_YEAR")}>half year</Button>
                    <Button variant="outline-secondary"
                            onClick={() => handleFilterChange("YEAR")}>year</Button>
                </ButtonGroup>
            </Popover.Content>
        </Popover>
    );
};

export default TaskFilter