import React from 'react';
import firebase from '../workers/firebase';
import Button from '../components/loadingButton';
import swal from "sweetalert";
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
                console.log(user)
                if (user) {
                    this.props.userPersonalInfo(user);
                    this.props.history.push(`/dashboard/${res.user.uid}`);
                } else {
                    this.props.history.push(`/set-profile/${res.user.uid}`);
                }
            }).catch(err => {
                swal('Error!!', err, 'error');
            })
        }).catch((err) => {
            swal('ERROR!!', err, 'error')
        })
    }

    render() {
        return (
            <div className="homeBackground">
                <div className="d-flex flex-column align-items-center justify-content-center layer">
                    <h2 className='font-mali display-md-2 display-sm-3 display-xs-5 mb-5 text-light'>Ready 2 Meat</h2>
                    <Button handleClick={this.login} name='Login With Facebook'></Button>
                </div>
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