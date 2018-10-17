import React from 'react';
import { Button, Menu, Icon } from 'antd';




export default class extends React.Component {
    constructor(props) {
        super(props)
    }

    handleClick = () => {
        this.props.handleClick()
    }

    render() {
        return (
            <Button type="primary" onClick={this.handleClick}>{this.props.children}</Button>
        )
    }
}