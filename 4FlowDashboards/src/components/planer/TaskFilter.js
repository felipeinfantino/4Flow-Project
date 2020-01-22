import React from 'react';
import {Popover, ButtonGroup, Button} from 'react-bootstrap'
import {FilterContext, filterOptions} from "./FilterContext";


const TaskFilter = (props) => {

    return (
        <FilterContext.Consumer>
            {({filterValue, updateFilterStatePlaner}) => (
                <Popover {...props} id="popover-basic">
                    <Popover.Title as="h3">Filter tasks</Popover.Title>
                    <Popover.Content>
                        <ButtonGroup aria-label="Basic example">
                            <Button variant="outline-secondary"
                                    onClick={() => updateFilterStatePlaner(filterOptions.WEEK)}>week</Button>
                            <Button variant="outline-secondary"
                                    onClick={() => updateFilterStatePlaner(filterOptions.MONTH)}>month</Button>
                            <Button variant="outline-secondary"
                                    onClick={() => updateFilterStatePlaner(filterOptions.HALF_YEAR)}>half year</Button>
                            <Button variant="outline-secondary"
                                    onClick={() => updateFilterStatePlaner(filterOptions.YEAR)}>year</Button>
                        </ButtonGroup>
                    </Popover.Content>
                </Popover>
            )}
        </FilterContext.Consumer>
    );
};

export default TaskFilter