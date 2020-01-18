import React from 'react';
import {Popover, ButtonGroup, Button} from 'react-bootstrap'


export default (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Filter tasks</Popover.Title>
      <Popover.Content>
        <ButtonGroup aria-label="Basic example">
            <Button variant="secondary">week</Button>
            <Button variant="secondary">month</Button>
            <Button variant="secondary">half year</Button>
            <Button variant="secondary">year</Button>
        </ButtonGroup>
      </Popover.Content>
    </Popover>
  );