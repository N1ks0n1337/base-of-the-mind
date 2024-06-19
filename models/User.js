// models/User.js
import mongoose from 'mongoose';
import argon2 from 'argon2';

const UserSchema = new mongoose.Schema({
    password: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    files: [{ type: mongoose.Schema.Types.ObjectId, ref: 'File' }],
});

// Хэширование пароля перед сохранением
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        this.password = await argon2.hash(this.password);
        next();
    } catch (err) {
        next(err);
    }
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);
export default User;
