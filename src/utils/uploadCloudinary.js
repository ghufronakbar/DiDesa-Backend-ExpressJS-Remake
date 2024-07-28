const cloudinary = require('../config/cloudinary')
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const {  
    CLOUDINARY_UMKM,
    CLOUDINARY_PROFILE,
    CLOUDINARY_PENGADUAN,
    CLOUDINARY_BERITA
} = require('../constant/cloudinary');
const randomCharacter = require('./randomCharacter');

const uploadCloudinary = (target) => {
    let folder;
    switch (target) {
        case 'berita':
            folder = CLOUDINARY_BERITA;
            break;
        case 'umkm':
            folder = CLOUDINARY_UMKM;
            break;
        case 'profile':
            folder = CLOUDINARY_PROFILE;
            break;
        case 'pengaduan':
            folder = CLOUDINARY_PENGADUAN;
            break;
        default:
            throw new Error('Target not found');
    }

    const storage = new CloudinaryStorage({
        cloudinary: cloudinary,
        params: {
            folder,
            format: async (req, file) => {
                const ext = file.mimetype.split('/')[1];
                const allowedFormats = ['png', 'jpg', 'jpeg', 'gif'];
                return allowedFormats.includes(ext) ? ext : 'jpg';
            },
            public_id: (req, file) => {
                const randomStr = randomCharacter(8);                
                return randomStr;
            }
        }
    });

    const parser = multer({ storage: storage });
    return parser;
}

module.exports = uploadCloudinary;
