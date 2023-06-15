import { model, models, Schema } from "mongoose";

const vendorSchema = new Schema({
    vendorName: String,
    bankAccountNumber: Number,
    bankName: String,
    addressLine1: String,
    addressLine2: String,
    city: String,
    country: String,
    zipCode: Number
})

const Vendors = models.vendor || model("vendor", vendorSchema)
export default Vendors;