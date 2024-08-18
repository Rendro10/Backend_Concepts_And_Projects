const { createHmac, randomBytes } = require('crypto'); // Corrected import
const mongoose = require("mongoose"); // Corrected import
const { createTokenForUSer } = require('../services/authentication');

const { Schema } = mongoose; // Destructuring

const userSchema = new Schema({ // Using Schema directly
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    salt: {
        type: String,
        // required: true
    },
    password: {
        type: String,
        required: true,
    },
    profileImageUrl: { // Corrected typo in property name
        type: String,
        default: "/images/default_profile.png"
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER"
    }
}, { timestamps: true });

userSchema.pre('save', function (next) {
    const user = this;

    if (!user.isModified("password")) return;

    const salt = randomBytes(16).toString('hex');// Corrected typo
    const hashedPassword = createHmac('sha256', salt).update(user.password).digest("hex");

    user.salt = salt; // Changed 'this' to 'user'
    user.password = hashedPassword; // Changed 'this' to 'user'

    next();
});

userSchema.statics.matchPassword = async function (email, password) {
    const user = await this.findOne({ email });

    if (!user) {
        throw new Error("User Not Found!!");
    }

    const salt = user.salt;
    const hashedPassword = user.password;

    const userProvidedHash = createHmac("sha256", salt).update(password).digest("hex");

    if (hashedPassword !== userProvidedHash) {
        throw new Error("Incorrect Password");
    }

    // Return token
    const token = createTokenForUSer(user);
    return token;
    
}
const User = mongoose.model('User', userSchema);

module.exports = User;