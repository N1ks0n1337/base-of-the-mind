// models/File.js
import mongoose from 'mongoose';

const FileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    format: {
        type: String,
        required: true,
    },
    uploadDate: {
        type: Date,
        default: Date.now,
    },
    size: {
        type: Number,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    summary: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
        required: true,
    },
    status: {
        type: String,
        default: 'pending',
    },
});

const File = mongoose.models.File || mongoose.model('File', FileSchema);

export default File;