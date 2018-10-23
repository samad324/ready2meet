import React from 'react';
import { Button, Icon } from 'antd';




export default class extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false
        }
    }

    endLoading = () => {
        this.setState({ loading: false })
    }

    enterLoading = () => {
        this.setState({ loading: true });
        this.props.handleClick();
    }

    render() {
        const { loading } = this.state
        return (
            <Button type="primary" loading={this.state.loading} onClick={this.enterLoading}>
                {
                    !loading && <Icon type="facebook" theme="outlined" />
                }
                {this.props.name}
            </Button>
        )
    }
}