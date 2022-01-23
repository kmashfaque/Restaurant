import slugify from "slugify";
import Category from "../models/category.model.js";

function createCategories (categories, parentId = null){
    const categoryList = []
    let category;
    if(parentId === null){
        category = categories.filter(cat => cat.parentId == undefined)
    }else{
        category = categories.filter(cat => cat.parentId == parentId)
    }
    for(let cate of category){
        categoryList.push({
            _id: cate._id,
            name: cate.name,
            slug: cate.slug,
            categoryIng: cate.categoryImg,
            parentId: cate.parentId,
            type: cate.type,
            children: createCategories(categories, cate._id)
        })
    }
    return categoryList
}
export const createCategory =(req, res) =>{
    const categoryObj = {
        name: req.body.name,
        slug: slugify(req.body.name)
    }
    if(req.file){
        categoryObj.categoryImg = process.env.API + '/public/' + req.file.filename
        console.log(categoryObj.categoryImg);
    }
    if(req.body.parentId){
        categoryObj.parentId = req.body.parentId
    }
    const cate = new Category(categoryObj)
    cate.save((error, category)=>{
        if(error) return res.status(400).json({message: error})
        if(category){
            return res.status(201).json({category})
        }
    })

}

export const getCategories = (req, res) =>{
    Category.find({}).exec((error, categories) => {
        if(error) return res.status(400).json({ error })
        if(categories){
            const categoriesList = createCategories(categories)
            return res.status(200).json({categoriesList})
        }
    })
}

export const updateCategories = async (req, res)=>{
    const {_id, name, parentId, type} = req.body;
    const updatedCategories = [];
    if(name instanceof Array){
        const length = name.length
        for(let i =0; i<length; i++){
            const category = {
                name: name[i],
                type: type[i]
            }
            if(parentId !== ''){
                category.parentId = parentId[i]
            }
            const updatedCategory = await Category.findOneAndUpdate({_id: _id[i]}, category, { new: true});
            updatedCategories.push(updatedCategory)
        }
        return res.status(200).json({message: 'update successful!'})
    }else{
        const category = {
            name,
            type
        };
        if(parentId !== ''){
            category.parentId = parentId
        }
        const updatedCategory = await Category.findOneAndUpdate({_id}, category, {newa: true})
        return res.status(200).json({ message: 'update successful!' })
    }
}

// export const deleteCategory = async(req, res)=>{
//     const {ids} = req.body.payload;
//     const deleteCategories =[];
//     const length = ids.length
//     for(let i = 0; i<length; i++){
//         const deleteCategory = await Category.findByIdAndDelete({
//             _id: ids[i]._id
//         });
//         deleteCategories.push(deleteCategory)
//     }
//     if(deleteCategories.length === ids.length){
//         res.status(202).json({
//             massege: 'Category removed'
//         })

//     }else{
//         res.status(400).json({message: 'Something went wrong!!!'})
//     }
// }

export const deleteCategory = (req, res) =>{
    Category.findById(req.params.id).exec(async(error, category)=>{
        if(error) res.status(400).json({message: 'error'})
        if(category){
            await category.remove()
            console.log(category);
            res.status(202).json({message: 'deleted'})
        }
    })

}