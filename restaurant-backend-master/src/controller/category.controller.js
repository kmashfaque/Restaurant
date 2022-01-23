import slugify from "slugify";
import Category from "../models/category.model.js";

export const createCategory =(req, res) =>{
    const categoryObj = {
        name: req.body.name,
        slug: slugify(req.body.name)
    }
    const cate = new Category(categoryObj)
    if(req.body.parentId){
        categoryObj.parentId = req.body.parentId
    }
    cate.save((error, category)=>{
        if(error) return res.status(400).json({message: error})
        if(category){
            return res.status(201).json({category})
        }
    })
}