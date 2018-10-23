import React from 'react';
import { connect } from 'react-redux';
import cloudinary from '../workers/cloudinary';
import { Carousel } from 'antd';
import { Button } from 'antd';
import LoadingButton from '../components/loadingButton';
import { Input } from 'antd';
import swal from 'sweetalert';
import ImagePicker from 'react-image-picker'
import 'react-image-picker/dist/index.css';
import { savePersonalInfo } from '../Store/Actions/Action'
import MyMapComponent from '../components/map';
import firebase from '../workers/firebase';
import img1 from '../assets/images/cocktail.jpg'
import img2 from '../assets/images/coffee.jpg'
import img3 from '../assets/images/juise.jpg'
import img4 from '../assets/images/20.jpg'
import img5 from '../assets/images/40.jpg'
import img6 from '../assets/images/60.jpg'





const imageList1 = [img1];
const imageList2 = [img2];
const imageList3 = [img3];
const imageList4 = [img4];
const imageList5 = [img5];
const imageList6 = [img6];




class setProfile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentSlide: 0,
            userName: '',
            phoneNumber: '',
            images: [null, null, null],
            image: null,
            bavarages: [],
            times: [],
            lat: null,
            long: null
        }

    }

    setLocation = () => {
        const { long, lat } = this.state
        if (!long && !lat) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.setState({
                    lat: position.coords.latitude,
                    long: position.coords.longitude
                })
            })
        }
    }

    selectbavarage = (e) => {
        const { bavarages } = this.state;
        if (!bavarages.includes(e)) {
            bavarages.push(e)
            this.setState({ bavarages });
        }
    }
    selectTime = (e) => {
        const { times } = this.state;
        if (!times.includes(e)) {
            times.push(e)
            this.setState({ times });
        }
    }
    onPick = (image) => {
        this.setState({ image })
    }

    dragEnd = (newPossiton) => {
        this.setState({
            lat: newPossiton.latLng.lat(),
            long: newPossiton.latLng.lng()
        })
        console.log({
            lat: newPossiton.latLng.lat(),
            long: newPossiton.latLng.lng()
        })
    }

    next = () => {
        const { userName, phoneNumber, currentSlide, images, bavarages, times, lat, long } = this.state;
        const { userPersonalInfo, userData } = this.props;
        if (currentSlide === 0) {
            this.setState({
                currentSlide: currentSlide + 1
            })
            this.carouselNext.next()
        }
        if (currentSlide === 1) {
            if (userName && phoneNumber) {
                this.setState({
                    currentSlide: currentSlide + 1
                })
                this.carouselNext.next()
            } else {
                swal('ERROR!!', "you should fill all the fields!!", 'error');
            }
        } else if (currentSlide === 2) {
            if (!images.includes(null)) {
                this.setState({
                    currentSlide: currentSlide + 1
                })
                this.carouselNext.next()
            } else {
                swal('ERROR!!', "you should select all the images!!", 'error');
            }
        } else if (currentSlide === 3) {
            if (bavarages.length && times.length) {
                this.setState({
                    currentSlide: currentSlide + 1
                })
                this.carouselNext.next()
            } else if (!bavarages.length) {
                swal('ERROR!!', "you should select one of the drink!!", 'error');
            } else if (!times.length) {
                swal('ERROR!!', "you should select one of the time period!!", 'error');
            }
        } else if (currentSlide === 4) {
            Promise.all(cloudinary.saveImgs(images))
                .then(res => {
                    res = res.map(item => {
                        if (item.secure_url) {
                            return item.secure_url
                        }
                    })
                    const data = {
                        userName,
                        phoneNumber,
                        images: res,
                        bavarages,
                        times,
                        location: { lat, long }
                    }
                    console.log(data)
                    firebase.saveUser(userData.uid, data).then(user => {
                        console.log(user)
                        userPersonalInfo(data);
                        this.props.history.push(`/dashboard/${this.props.match.params.id}`);
                    }).catch(err => {
                        console.log(err)
                    })
                })
        }
    }

    saveImg = (e) => {
        const { images } = this.state
        var reader = new FileReader();
        let id = e.target.id - 1
        reader.addEventListener("load", () => {
            images.splice(id, 1, reader.result);
            this.setState({ images })
        }, false);

        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }
        // let img = images.splice(id,1,)
    }


    render() {
        const { userName, phoneNumber, images, long, lat } = this.state;
        this.setLocation()
        return (
            <div>
                <Carousel vertical className="bg-dark" ref={(ref) => { this.carouselNext = ref }}>


                    <div>
                        <div style={{ height: '99.8vh', overflow: "hidden" }} className='d-flex flex-column align-items-center justify-content-center'>
                            <div>
                                <div className="font-mali display-md-2 display-sm-3 display-xs-5 text-light ">Thank You!!</div>
                                <h3 className=' text-light d-flex justify-content-center font-mali'>For Registring on Ready 2 Meat!! </h3>
                                <div className='d-flex flex-column align-items-center'>
                                    <h5 className=' text-light font-mali'>Are you ready to fill out your further details?</h5>
                                    <Button onClick={this.next} type='primary'>Yes</Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* STEP   1*/}

                    <div>
                        <div style={{ height: '99.8vh', overflow: "hidden" }} className='d-flex flex-column align-items-center justify-content-center'>
                            <div>
                                <Input
                                    placeholder="nikename"
                                    className='my-3'
                                    onChange={(e) => { this.setState({ userName: e.target.value }) }}
                                    value={userName}
                                />
                                <Input
                                    placeholder="mobile number"
                                    type='number'
                                    onChange={(e) => { this.setState({ phoneNumber: e.target.value }) }}
                                    value={phoneNumber}
                                />
                            </div>
                            <div className='mt-2'>
                                <Button onClick={this.next} type='primary'>Next</Button>
                            </div>
                        </div>
                    </div>

                    {/* STEP   2*/}

                    <div>
                        <div style={{ height: '99.8vh', overflow: "auto" }}>
                            <div className='container mt-5'>
                                <div className='row' style={{ width: "100%" }}>
                                    <div className='col-cm-12 col-md-4' style={{ height: "300px" }}>
                                        <div className='d-flex flex-column justify-content-center align-items-center  border border-white rounded' style={{ height: "80%" }}>
                                            <div>
                                                {images[0] ?
                                                    <img src={images[0]} alt="..." className='w-100' style={{ height: "238px", borderRadius: '4px' }} />
                                                    :
                                                    <p className='text-light'>Select Image</p>
                                                }
                                            </div>
                                        </div>
                                        <div className='d-flex justify-content-center mt-2'>
                                            <label style={styles.fileContainer}>
                                                <Button type='primary'>Upload Image</Button>
                                                <input type="file" style={styles.file} id="1" onChange={this.saveImg} accept="image/*" />
                                            </label>
                                        </div>
                                    </div>
                                    <div className='col-cm-12 col-md-4' style={{ height: "300px" }} >
                                        <div className='d-flex flex-column justify-content-center align-items-center  border border-white rounded' style={{ height: "80%" }}>
                                            <div>
                                                {images[1] ?
                                                    <img src={images[1]} alt="..." className='w-100' style={{ height: "238px", borderRadius: '4px' }} />
                                                    :
                                                    <p className='text-light'>Select Image</p>
                                                }
                                            </div>
                                        </div>
                                        <div className='d-flex justify-content-center mt-2'>
                                            <label style={styles.fileContainer}>
                                                <Button type='primary'>Upload Image</Button>
                                                <input type="file" id="2" style={styles.file} onChange={this.saveImg} accept="image/*" />
                                            </label>
                                        </div>
                                    </div>
                                    <div className='col-cm-12 col-md-4' style={{ height: "300px" }}>
                                        <div className='d-flex flex-column justify-content-center align-items-center  border border-white rounded' style={{ height: "80%" }}>
                                            <div>
                                                {images[2] ?
                                                    <img src={images[2]} alt="..." className='w-100' style={{ height: "238px", borderRadius: '4px' }} />
                                                    :
                                                    <p className='text-light'>Select Image</p>
                                                }
                                            </div>
                                        </div>
                                        <div className='d-flex justify-content-center mt-2'>
                                            <label style={styles.fileContainer}>
                                                <Button type='primary'>Upload Image</Button>
                                                <input type="file" id="3" style={styles.file} onChange={this.saveImg} accept="image/*" />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='mt-5 mr-4 d-flex justify-content-center'>
                                <Button onClick={this.next} type='primary'>Next</Button>
                            </div>
                        </div>
                    </div>

                    {/* STEP   3*/}

                    <div>
                        <div style={{ height: '99.8vh', overflow: "hidden" }} className=''>
                            <div className='container mt-5'>
                                <div className="row w-100" >
                                    <div className="col-sm-12 col-md-4 p-3 d-flex justify-content-center">
                                        <div className='' style={{ height: "180px" }} id='cocktail' onClick={this.selectbavarage.bind(this, 'cocktail')}>
                                            <ImagePicker
                                                images={imageList1.map((image, i) => ({ src: image, value: i }))}
                                                onPick={this.onPick}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-4 p-3 d-flex justify-content-center">
                                        <div className='' style={{ height: "180px" }} id='coffee' onClick={this.selectbavarage.bind(this, 'coffee')}>
                                            <ImagePicker
                                                images={imageList2.map((image, i) => ({ src: image, value: i }))}
                                                onPick={this.onPick}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-4 p-3 d-flex justify-content-center">
                                        <div className='' style={{ height: "180px" }} id='juice' onClick={this.selectbavarage.bind(this, 'juice')}>
                                            <ImagePicker
                                                images={imageList3.map((image, i) => ({ src: image, value: i }))}
                                                onPick={this.onPick}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row w-100" >
                                    <div className="col-sm-12 col-md-4 p-3 d-flex justify-content-center">
                                        <div className='' style={{ height: "180px" }} id='20' onClick={this.selectTime.bind(this, '20')}>
                                            <ImagePicker
                                                images={imageList4.map((image, i) => ({ src: image, value: i }))}
                                                onPick={this.onPick}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-4 p-3 d-flex justify-content-center">
                                        <div className='' style={{ height: "180px" }} id='40' onClick={this.selectTime.bind(this, '40')}>
                                            <ImagePicker
                                                images={imageList5.map((image, i) => ({ src: image, value: i }))}
                                                onPick={this.onPick}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-4 p-3 d-flex justify-content-center">
                                        <div className='' style={{ height: "180px" }} id='60' onClick={this.selectTime.bind(this, '60')}>
                                            <ImagePicker
                                                images={imageList6.map((image, i) => ({ src: image, value: i }))}
                                                onPick={this.onPick}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='mt-5 mr-4 d-flex justify-content-center'>
                                <Button onClick={this.next} type='primary'>next</Button>
                            </div>
                        </div>
                    </div>

                    {/* STEP   4*/}

                    <div>
                        <div style={{ height: '99.8vh', overflow: "hidden" }}>
                            <div className='m-4 text-light'>
                                <h3 className='font-mali'>Your Location</h3>
                            </div>
                            <div style={{ zIndex: 1000 }}>
                                {
                                    lat &&
                                    <MyMapComponent
                                        isMarkerShown
                                        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                                        loadingElement={<div style={{ height: `100%` }} />}
                                        containerElement={<div style={{ height: '70vh' }} />}
                                        mapElement={<div style={{ height: `100%` }} />}
                                        lat={lat}
                                        long={long}
                                        dragEnd={this.dragEnd}
                                    />
                                }
                            </div>
                            <div className='mt-5 mr-4 d-flex justify-content-center'>
                                <LoadingButton handleClick={this.next} name='Finish'>Finish</LoadingButton>
                            </div>
                        </div>
                    </div>
                </Carousel>
            </div >
        );
    }
}

const styles = {
    fileContainer: {
        overflow: "hidden",
        position: "relative"
    },
    file: {
        cursor: "pointer",
        display: "block",
        fontSze: "999px",
        filter: "alpha(opacity=0)",
        minHeight: "100%",
        minWidth: " 100%",
        opacity: "0",
        position: "absolute",
        right: 0,
        textAlign: "right",
        top: 0
    }
}

const mapAllStateFromStore = (state) => {
    return {
        userData: state.userData
    }
}

const addDataInStore = (dispatch) => {
    return {
        userPersonalInfo: (userPersonalData) => { dispatch(savePersonalInfo(userPersonalData)) }
    }
}

export default connect(mapAllStateFromStore, addDataInStore)(setProfile)