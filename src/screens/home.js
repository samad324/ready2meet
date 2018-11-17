import React from 'react';
import firebase from '../workers/firebase';
import Button from '../components/loadingButton';
import swal from "sweetalert";
import { connect } from 'react-redux';
import { saveUser, savePersonalInfo } from '../Store/Actions/Action';
import logoWebbab from './logo'
import './home.css';



class Home extends React.Component {
    constructor(props) {
        super(props)
        console.log(this.props.userdata)
    }

    componentDidMount() {
        const runLogo = new logoWebbab();
        runLogo.init();
    }

    login = () => {
        firebase.faceookLogin().then((res) => {
            this.props.userInfo(res.token, res.user);
            firebase.getUserData(res.user.uid).then(user => {
                console.log(user)
                if (user) {
                    this.props.userPersonalInfo(user);
                    firebase.updateToken(res.token, res.user.uid)
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
                    <div className="logo-wrapper">

                        <svg version="1.1" id="logo-webbab" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet"
                            viewBox="0 0 388.691 120">

                            <text x="140" y="84" id='w' className='word' fill="red" style={{ fontSize: 60, fontWeight: "bold" }}>Re</text>
                            <text x="216" y="84" id='e' className='word' fill="red" style={{ fontSize: 60, fontWeight: "bold" }}>ad</text>
                            <text x="292" y="84" id='b1' className='word' fill="red" style={{ fontSize: 60, fontWeight: "bold" }}>y </text>
                            <text x="332" y="84" id='b2' className='word' fill="red" style={{ fontSize: 60, fontWeight: "bold" }}>2 </text>
                            <text x="372" y="84" id='a' className='word' fill="red" style={{ fontSize: 60, fontWeight: "bold" }}>me</text>
                            <text x="456" y="84" id='b1' className='word' fill="red" style={{ fontSize: 60, fontWeight: "bold" }}>e</text>
                            <text x="492" y="84" id='b1' className='word' fill="red" style={{ fontSize: 60, fontWeight: "bold" }}>t</text>

                            <mask id="mask" x="0" y="0" width="100%" height="100%">

                                <rect id="alpha" className="rhombus" width="93.237" height="93.237" x="13.4" y="13.678" />

                                <circle className="logo-circle" fill="#000000" cx="87" cy="61.2" r="9" />
                                <circle className="logo-circle" fill="#000000" cx="41" cy="35" r="6" />
                                <circle className="logo-circle" fill="#000000" cx="53" cy="78" r="7" />

                                <ellipse className="logo-ellipse" fill="none" stroke="#000000" strokeMiterlimit="10" strokeWidth="2" cx="6"
                                    cy="-64" rx="150" ry="150" />
                                <ellipse className="logo-ellipse" fill="none" stroke="#000000" strokeMiterlimit="10" strokeWidth="2" cx="138"
                                    cy="-80" rx="150" ry="150" />
                                <ellipse className="logo-ellipse" fill="none" stroke="#000000" strokeMiterlimit="10" strokeWidth="2" cx="190"
                                    cy="15" rx="150" ry="150" />

                            </mask>

                            <rect id="iso" className="rhombus" width="93.237" height="93.237" x="13.4" y="13.678" />

                        </svg>

                    </div>
                    <div>
                        <h2 className='font-mali display-md-2 display-sm-3 display-xs-5 mb-5 text-light heading'>Ready 2 Meat</h2>
                    </div>
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