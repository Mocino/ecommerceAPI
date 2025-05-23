import mongoose, {Schema} from "mongoose";

const UserSchema = new Schema({
    rol: { type: String, maxlength: 30, required: true },
    name: { type: String, maxlength: 250, required: true },
    surname: { type: String, maxlength: 250, required: false },  // No requerido
    email: { type: String, maxlength: 250, required: true, unique: true },
    password: { type: String, maxlength: 250, required: true },
    avatar: { type: String, maxlength: 250, required: false },  // No requerido
    state: { type: Number, default: 1 }, // 1 activo, 2 inactivo
    phone: { type: String, maxlength: 20, required: false },  // No requerido
    birthday: { type: String, maxlength: 20, required: false }  // No requerido
}, {
    timestamps: true
});

const User = mongoose.model("user", UserSchema);
export default User;