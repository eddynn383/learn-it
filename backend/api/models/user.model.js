// import { ObjectId } from "mongodb"
import mongoose from "mongoose"

const usersSchema = new mongoose.Schema({
    _id: { 
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        required: true
    },
    profile: {
        title: {
            type: String,
            required: false
        },
        firstname: {
            type: String,
            required: false
        },
        lastname: {
            type: String,
            required: false
        },
        desc: {
            type: String,
            required: false
        },
        address: {
            type: String,
            required: false
        },
        city: {
            type: String,
            required: false
        },
        country: {
            type: String,
            required: false
        },
        company: {
            type: String,
            required: false
        },
        photo: {
            type: String,
            required: true,
            default: "/none"
        },
        language: {
            type: String,
            required: true,
            default: "English (GB)"
        },
        currecy: {
            type: String,
            required: true,
            default: "USD"
        },
        theme: {
            type: String,
            required: true,
            default: "light"
        }
    },
    reward: {
        level: {
            value: {
                type: Number,
                required: true,
                default: 0
            },
            exp: {
                type: Number,
                required: true,
                default: 0
            }
        },
        skills: {
            all: {
                type: Array,
                required: true
            },
            year: {
                type: Array,
                required: true
            },
            month: {
                type: Array,
                required: true
            }
        },
        certifications: {
            all: {
                type: Array,
                required: true
            },
            year: {
                type: Array,
                required: true
            },
            month: {
                type: Array,
                required: true
            }
        }
    },
    registerDate: {
        type: Date,
        required: true,
        default: Date.now
    }

})

const userModel =  mongoose.model('User', usersSchema)

export default userModel