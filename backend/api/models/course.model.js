// import mongoose from "mongoose"

// const coursesSchema = new mongoose.Schema({
//     _id: { 
//         type: String,
//         required: true
//     },
//     title: {
//         type: String,
//         required: true
//     },
//     desc: {
//         type: String,
//         required: false
//     },
//     language: {
//         type: String,
//         required: true,
//         default: "English (GB)"
//     },
//     registerDate: {
//         type: Date,
//         required: true,
//         default: Date.now
//     },
//     startDate: {
//         type: Date,
//         required: false,
//     },
//     endDate: {
//         type: Date,
//         required: false,
//     },
//     rating: {
//         type: Number,
//         required: false
//     },
//     type: {
//         type: String,
//         required: true,
//     },
//     content: {
//         type: Object,
//         required: false
//     }

// })

// const courseModel =  mongoose.model('Course', coursesSchema)

// export default courseModel