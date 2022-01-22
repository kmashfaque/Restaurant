import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    addressId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"UserAddress.address",
        required:true
    },totalAmount:{
        type:Number,
        required:true
    },
    items:[
        {
            productId:{
                type:mongoose.Schema.Types.ObjectId,
                required:true,
                ref:"Product"
            },
            payablePrice:{
                type:Number,
                required:true
            },
            purcahseQty:{
                type:Number,
                required:true
            }
        }
    ],
    paymentStatus: {
        type: String,
        enum: ['pending', 'completed', 'cancelled', 'refund'],
        required: true
    },
    paymentType:{
        type:String,
        enum:["cod","card"],
        required:true
    },
    orderStatus:[
        {
            type:{
                type:String,
                enum:["ordered","shipped","delivered"],
                default:"ordered"
            },
            date:{
                type:Date
            },
            isCompleted:{
                type:Boolean,
                default:false
            }
        }
    ]
},{timestamps:true})


const Order=mongoose.model("Order",orderSchema)

export default Order