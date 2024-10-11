import jwt from "jsonwebtoken"
import "dotenv/config"

export function generateToken(user){

    return jwt.sign( {
        userID: user._id,
        userEmail: user.email,
        isVerified: true,
      },
      process.env.SECRET,
      { expiresIn: "1h" })
}