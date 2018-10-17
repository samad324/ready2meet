import React from 'react';
import firebase from '../workers/firebase';
import Button from '../components/loadingButton';
import { connect } from 'react-redux';
import { saveUser, savePersonalInfo } from '../Store/Actions/Action';



class Home extends React.Component {
    constructor(props) {
        super(props)
        console.log(this.props.userdata)
    }

    login = () => {
        firebase.faceookLogin().then((res) => {
            this.props.userInfo(res.token, res.user);
            firebase.getUserData(res.user.uid).then(user => {
                if (user) {
                    this.props.savePersonalInfo(user);
                }
            }).catch(err => {
                this.props.history.push(`/set-profile/${res.user.uid}`);
            })
        })
    }

    render() {
        return (
            <div className="d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
                <Button handleClick={this.login} name='Login With Facebook'></Button>
            </div>
        );
    }
}


const mapAllStateFromStore = (state) => {
    return {
        userdata: 'userdata'
    }
}

const addDataInStore = (dispatch) => {
    return {
        userInfo: (userToken, userData) => { dispatch(saveUser(userToken, userData)) },
        userPersonalInfo: (userPersonalData) => { dispatch(savePersonalInfo(userPersonalData)) }
    }
}

export default connect(mapAllStateFromStore, addDataInStore)(Home)