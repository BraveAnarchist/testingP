import { userModel } from "../models/usermodel.js";
import { productModel } from "../models/productModel.js";
import { uploadToCloudinary } from "../services/cloudinaryUpload.js";


export async function createProduct(req, res) {
    try {
      let url = await uploadToCloudinary(req);
      // console.log(url);
  
      let { name, brand, category, price, description, inStock, inventory } =
        req.body;
      
      const product = new productModel({
        name,
        url,
        brand,
        category,
        price,
        description,
        inStock,
        inventory,
        addedBy: req.user._id,
      });
      await product.save();
      res.status(201).json({ message: "product added" });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
  
  export async function getAllProducts(req, res) {
    let query = {};
    let sortArg = {};
  
    if (req.query.brand) {
      query.brand = req.query.brand;
    }
  
    if (req.query.category) {
      query.category = req.query.category;
    }
  
    if (req.query.sortBy && req.query.sort) {
      const sortField = req.query.sortBy;
      const sortOrder = req.query.sort.toLowerCase() === "asc" ? 1 : -1;
  
      sortArg[sortField] = sortOrder;
    }
  
    if (req.query.price) {
      const priceOperators = {
        "=": "$eq",
        "<": "$lt",
        ">": "$gt",
        "<=": "$lte",
        ">=": "$gte",
      };
  
      // [=, <, >, <=, >=]
  
      Object.keys(priceOperators).forEach((operator) => {
        if (req.query.price.startsWith(operator)) {
          query.price = {
            [priceOperators[operator]]: req.query.price.slice(operator.length),
          };
        }
      });
    }
  
    if (req.query.name) {
      query.name = { $regex: req.query.name, $options: "i" }; //i: case insensitivity
    }
  
    const allProducts = await productModel.find(query).sort(sortArg);
    res.json(allProducts);
  }
  
  export async function deleteProduct(req, res) {
    try {
      const idToDelete = req.params.id;
      const productDeleted = await productModel.findByIdAndDelete(idToDelete);
      if (productDeleted) res.json({ message: "Product Deleted" });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
  
  //FETCH A SINGLE PRODCUCT
  
  export async function getSingleProduct(req, res) {
    const idToFind = req.params.id;
    const singleProduct = await productModel.findById({ _id: idToFind });
    res.json(singleProduct);
  }
  
  export async function addToWishlist(req, res) {
    const { productID } = req.params;
    const userID = req.user._id;
    let updatedUser;
  
    //GATHER ALL THE DATA FOR THIS USER
  
    //CHECK WHETHER PRODUCT IS ALREADY ADDED
    const user = req.user;
    const existingProduct = user.wishlist.find((ids) => ids === productID);
    if (!existingProduct) {
      //push productID into wishlist
      updatedUser = await userModel.findByIdAndUpdate(
        userID,
        { $push: { wishlist: productID } },
        { new: true }
      );
    } else {
      //remove productID from wishlist
      updatedUser = await userModel.findByIdAndUpdate(
        userID,
        {
          $pull: { wishlist: productID },
        },
        { new: true }
      );
    }
    res.json(updatedUser);
  }