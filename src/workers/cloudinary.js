import Cloudinary from '../config/cloudinary';



const saveImgs = (images) => {
    let promises = [];

    images.map(item => {
        promises.push(new Promise(resolve => {
            Cloudinary.v2.uploader.upload(item,
                function (error, result) {
                    if (error) resolve(error);
                    resolve(result)
                })
        }))
    })
    return promises
}

export default { saveImgs }