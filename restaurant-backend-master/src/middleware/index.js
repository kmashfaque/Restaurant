import multer from 'multer';
import path from 'path';

const upload = multer({ dest: 'uploads/'})

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function (req, file, cb){
        cb(null, new Date.now() + '-' + file.originalname)
    }
})

upload = multer({storage})

const requireSignin = (req, res, next) => {
    
}

const userMiddleware = (req, res, next) => {
    if(req.user.role !== 'user'){
        return res.status(400).json({
            message: 'Only user can access!'
        })
    }
    next()
}
const riderMiddleware = (req, res, next) => {
    if(req.user.role !== 'rider'){
        return res.status(400).json({
            message: 'Only rider can access!'
        })
    }
    next()
}
const adminMiddleware = (req, res, next) => {
    if(req.user.role !== 'admin'){
        return res.status(400).json({
            message: 'Only admin can access!'
        })
    }
    next()
}

export {
    upload,
    requireSignin,
    userMiddleware,
    riderMiddleware,
    adminMiddleware
};
