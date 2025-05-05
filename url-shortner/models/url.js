import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    redirectUrl: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                // Simple URL validation
                return /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(v);
            },
            message: props => `${props.value} is not a valid URL!`
        },
        trim: true
    },
    visitHistory: [{
        timeStamp: {
            type: Number
        },
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

const Url = mongoose.model('Url', urlSchema);
export default Url;