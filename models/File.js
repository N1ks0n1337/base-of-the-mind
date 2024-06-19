// models/File.js

import mongoose from 'mongoose';

const FileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    path: {
        type: String,
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
    uploadedAt: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

const File = mongoose.models.File || mongoose.model('File', FileSchema);

export default File;
