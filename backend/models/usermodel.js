import mongoose from "mongoose"

const schema =mongoose.Schema(
    {
        fname:{
            type:String,
            required:true,
        },
        lname:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
        },
        password: {
            type: String,
            required: true,
          },
          role: {
            type: String,
            required: true,
          },
          wishlist: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: "product",
            },
          ],

    },
    { timestamps: true }
)

export const userModel=mongoose.model("user",schema);