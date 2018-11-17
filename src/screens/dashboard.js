import React, { Component } from 'react'
import { Button } from 'antd';
import Modal from 'react-awesome-modal';
import firebase from '../workers/firebase.js';
import { connect } from 'react-redux';
import { saveUser } from '../Store/Actions/Action'
import Swipeable from "react-swipy";
import Card from "../components/card/card";

const appStyles = {
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  fontFamily: "sans-serif",
  overflow: "hidden"
};

const wrapperStyles = { position: "relative", width: "250px", height: "250px" };
const actionsStyles = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: 12
};


class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      stack: null,
      userdata: this.props.userdata,
      matches: []
    }
  }

  componentWillReceiveProps(nextProp) {
    this.setState({ userdata: nextProp.userdata })
  }
  componentWillMount() {
    if (!this.props.userdata) {
      let id = this.props.match.params.id;
      firebase.getUserData(id)
        .then(user => {
          this.props.userInfo(user.token, user)
        })
    }
  }

  openModal() {
    this.setState({
      visible: true
    });
  }

  closeModal() {
    this.setState({
      visible: false
    });
  }
  setMeeting = async () => {
    const { userdata } = this.state
    const matches = [];
    await firebase.getAllUsers().then(users => {
      users.forEach(user => {
        user = user.data()
        let matchDrink = false;
        let matchTime = false;
        if (user.userName === userdata.userName) return
        user.bavarages.map(item => {
          if (userdata.bavarages.includes(item)) {
            matchDrink = true
          }
        })

        user.times.map(time => {
          if (userdata.times.includes(time)) {
            matchTime = true
          }
        })

        if (matchDrink && matchTime) {
          matches.push(user)
        }
      });
    })

    this.setState({ matches })
    this.openModal()
  }

  remove = () => {
    this.setState(({ matches }) => ({ matches: matches.slice(1, matches.length) }));
  }
  render() {
    const { matches } = this.state
    return (
      <div className='d-flex flex-column align-items-center justify-content-center' style={{ height: "100vh" }}>
        <p className='text-light font-mali text-align-center align-self-center h3 ' style={{ textShadow: "-1px -2px 12px rgba(33,33,34,0.87)" }}>“You haven’t done any meeting yet!”, try creating a new meeting</p>
        <Button type='primary' className='mt-3 font-weight-bold' onClick={this.setMeeting}>Set a Meeting!</Button>
        <Modal visible={this.state.visible} width='80%' height='60%' effect="fadeInUp" onClickAway={() => this.closeModal()}>
          <div style={appStyles}>
            <div style={wrapperStyles}>
              {matches.length > 0 && (
                <div style={wrapperStyles}>
                  <Swipeable
                    buttons={({ right, left }) => (
                      <div style={actionsStyles}>
                        <Button onClick={left} type='primary'>Reject</Button>
                        <Button onClick={right} type='primary'>Accept</Button>
                      </div>
                    )}
                    onAfterSwipe={this.remove}
                  >
                    <Card>{matches[0].userName}</Card>
                  </Swipeable>
                  {matches.length > 1 && <Card zIndex={-1}>{matches[1].userName}</Card>}
                </div>
              )}
              {matches.length <= 1 && <Card zIndex={-2}>No more cards</Card>}
            </div>
          </div>
        </Modal>
      </div >
    )
  }
}

const mapAllStateFromStore = (state) => {
  return {
    userdata: state.userData
  }
}

const addDataInStore = (dispatch) => {
  return {
    userInfo: (userToken, userData) => { dispatch(saveUser(userToken, userData)) },
  }
}

export default connect(mapAllStateFromStore, addDataInStore)(Dashboard)
