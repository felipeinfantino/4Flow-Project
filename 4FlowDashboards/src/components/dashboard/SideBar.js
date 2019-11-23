import React, {Component} from 'react'
import {slide as Menu} from 'react-burger-menu';
import './SideBar.css';

export class SideBar extends Component {
    render() {
        return (
            <Menu>
                <a className="menu-item" href="/link1">
                    Placeholder
                </a>

                <a className="menu-item" href="/link2">
                    Placeholder 2
                </a>
            </Menu>
        );
    }
}

export default SideBar