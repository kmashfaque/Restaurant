import express from "express";
import multer from "multer";
import path from 'path';
import shortid from "shortid";
import { createCategory, deleteCategory, getCategories, updateCategories } from "../controller/category.controller.js";
const router = express.Router();

const __dirname = path.resolve()
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname, 'uploads'))
    },
    filename: function (req, file, cb){
        cb(null, shortid.generate() + '-' + file.originalname)
    }
});
const upload = multer({storage})

router.post('/', upload.single('categoryImage'), createCategory)
router.get('/getcategory', getCategories)
router.put('/updatecategory', updateCategories)
router.delete('/deletecategory/:id', deleteCategory)
export default router