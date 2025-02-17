import { Schema, model, models } from "mongoose"

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email already exists!'],
        required: [true, 'Email is required!'],
    },
    username: {
        type: String,
    },
    password: {
        type: String,
        required: false,
    },
    image: {
        type: String || Object,
    },
});
const User = (models?.User) || model("User", UserSchema)
console.log(models)

export default User