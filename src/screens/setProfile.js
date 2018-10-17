import React from 'react';
import { connect } from 'react-redux';
import { Carousel } from 'antd';
import { Button } from 'antd';
import { Input } from 'antd';
import swal from 'sweetalert';
import ImagePicker from 'react-image-picker'
import 'react-image-picker/dist/index.css'

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
            currentSlide: 1,
            userName: '',
            phoneNumber: '',
            images: [null, null, null],
            image: null,
            bavarages: [],
            times: []
        }
    }


    selectbavarage = (e) => {
        const { bavarages } = this.state;
        if (!bavarages.includes(e)) {
            bavarages.push(e)
            this.setState({ bavarages });
        }
        console.log(bavarages)
    }
    selectTime = (e) => {
        const { times } = this.state;
        if (!times.includes(e)) {
            times.push(e)
            this.setState({ times });
        }
        console.log(times)
    }
    onPick = (image) => {
        this.setState({ image })
    }

    next = () => {
        const { userName, phoneNumber, currentSlide, images, bavarages, times } = this.state;
        if (currentSlide == 1) {
            if (userName && phoneNumber) {
                this.setState({
                    currentSlide: currentSlide + 1
                })
                this.carouselNext.next()
            } else {
                swal('ERROR!!', "you should fill all the fields!!", 'error');
            }
        } else if (currentSlide == 2) {
            if (!images.includes(null)) {
                this.setState({
                    currentSlide: currentSlide + 1
                })
                this.carouselNext.next()
            } else {
                swal('ERROR!!', "you should select all the images!!", 'error');
            }
        } else if (currentSlide == 3) {
            if (bavarages.length && times.length) {
                this.setState({
                    currentSlide: currentSlide + 1
                })
                this.carouselNext.next()
            } else if(!bavarages.length) {
                swal('ERROR!!', "you should select one of the drink!!", 'error');
            } else if(!times.length) {
                swal('ERROR!!', "you should select one of the time period!!", 'error');
            }
        }
    }

    saveImg = (e) => {
        const { images } = this.state
        var reader = new FileReader();
        let id = e.target.id - 1
        reader.addEventListener("load", () => {
            images.splice(id, 1, reader.result);
            console.log(images)
            this.setState({ images })
        }, false);

        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }
        // let img = images.splice(id,1,)
    }


    render() {
        const { userName, phoneNumber, images } = this.state
        return (
            <div>
                <Carousel vertical className="bg-dark" ref={(ref) => { this.carouselNext = ref }}>

                    {/* STEP   1*/}

                    <div>
                        <div style={{ height: '96vh', overflow: "hidden" }} className='d-flex flex-column align-items-center justify-content-center'>
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
                        <div style={{ height: '96vh', overflow: "auto" }}>
                            <div className='container mt-5'>
                                <div className='row' style={{ width: "100%" }}>
                                    <div className='col-cm-12 col-md-4' style={{ height: "300px" }}>
                                        <div className='d-flex flex-column justify-content-center align-items-center  border border-white rounded' style={{ height: "80%" }}>
                                            <div>
                                                {images[0] ?
                                                    <img src={images[0]} alt="..." className='w-100' />
                                                    :
                                                    <p className='text-light'>Select Image</p>
                                                }
                                            </div>
                                        </div>
                                        <div className='d-flex justify-content-center mt-2'>
                                            <label style={styles.fileContainer}>
                                                <Button type='primary'>Upload Image</Button>
                                                <input type="file" style={styles.file} id="1" onChange={this.saveImg} />
                                            </label>
                                        </div>
                                    </div>
                                    <div className='col-cm-12 col-md-4' style={{ height: "300px" }}>
                                        <div className='d-flex flex-column justify-content-center align-items-center  border border-white rounded' style={{ height: "80%" }}>
                                            <div>
                                                {images[1] ?
                                                    <img src={images[1]} alt="..." className='w-100' />
                                                    :
                                                    <p className='text-light'>Select Image</p>
                                                }
                                            </div>
                                        </div>
                                        <div className='d-flex justify-content-center mt-2'>
                                            <label style={styles.fileContainer}>
                                                <Button type='primary'>Upload Image</Button>
                                                <input type="file" id="2" style={styles.file} onChange={this.saveImg} />
                                            </label>
                                        </div>
                                    </div>
                                    <div className='col-cm-12 col-md-4' style={{ height: "300px" }}>
                                        <div className='d-flex flex-column justify-content-center align-items-center  border border-white rounded' style={{ height: "80%" }}>
                                            <div>
                                                {images[2] ?
                                                    <img src={images[2]} alt="..." className='w-100' />
                                                    :
                                                    <p className='text-light'>Select Image</p>
                                                }
                                            </div>
                                        </div>
                                        <div className='d-flex justify-content-center mt-2'>
                                            <label style={styles.fileContainer}>
                                                <Button type='primary'>Upload Image</Button>
                                                <input type="file" id="3" style={styles.file} onChange={this.saveImg} />
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
                        <div style={{ height: '96vh', overflow: "hidden" }} className=' '>
                            <div className='container'>
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
                                <Button onClick={this.next} type='primary'>Finish</Button>
                            </div>
                        </div>
                    </div>
                </Carousel>
            </div>
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
        userdata: state.userToken
    }
}
export default connect(mapAllStateFromStore)(setProfile)