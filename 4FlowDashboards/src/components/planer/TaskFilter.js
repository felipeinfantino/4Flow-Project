import React from 'react';
import {Popover, ButtonGroup, Button} from 'react-bootstrap'


export default (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Filter tasks</Popover.Title>
      <Popover.Content>
        <ButtonGroup aria-label="Basic example">
            <Button variant="outline-secondary">week</Button>
            <Button variant="outline-secondary">month</Button>
            <Button variant="outline-secondary">half year</Button>
            <Button variant="outline-secondary">year</Button>
        </ButtonGroup>
      </Popover.Content>
    </Popover>
  );