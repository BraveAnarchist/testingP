import express from "express";
import cors from "cors";
import "dotenv/config";
import userRouter from "./routes/userRoutes.js";
import productRouter from "./routes/productRoutes.js";

const app = express();

mongodb+srv://anonymousunknown:<db_password>@cluster0.umhw6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
};

const PORT = process.env.PORT; 
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api",userRouter);
app.use("/api/product", productRouter);

try{
    await mongoose.connect(`mongodb+srv://anonymousunknown:${process.env.DBPW}@cluster0.umhw6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
    app.listen(PORT,()=>console.log("Server started at port"+   PORT))
}
catch(err){
    console.log(err);
}
