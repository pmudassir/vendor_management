import Vendors from "../model/vendors"

export async function getVendors(req, res) {
    try {
        const vendors = await Vendors.find({})
        if (!vendors) {
            return res.status(404).json("No vendors found")
        }
        res.status(200).json(vendors)
    } catch (error) {
        res.status(404).json({ error: "Error while fetching data" })
    }
}

export async function getVendor(req, res) {
    try {
        const { vendorId } = req.query
        if (vendorId) {
            const vendor = await Vendors.findById(vendorId)
            return res.status(200).json(vendor)
        }
        res.status(404).json("Vendor not found")
    } catch (error) {
        res.status(404).json({ error: "While fetching a single vendor" })
    }
}

export async function postVendors(req, res) {
    try {
        const formData = req.body
        if (!formData) {
            return res.status(404).json("No Data to be posted")
        }
        const data = await Vendors.create(formData)
        res.status(200).json(data)
    } catch (error) {
        res.status(404).json(error)
    }
}

export async function putVendors(req, res) {
    try {
        const { vendorId } = req.query
        const formData = req.body
        if (vendorId && formData) {
            const vendor = await Vendors.findByIdAndUpdate(vendorId, formData)
            return res.status(200).json(vendor)
        }
        res.status(404).json({ error: "Vendor Not Selected" })
    } catch (error) {
        res.status(404).json({ error: "Error while updating the data" })
    }
}

export async function deleteVendors(req, res) {
    try {
        const { vendorId } = req.query
        if (vendorId) {
            await Vendors.findByIdAndDelete(vendorId)
            return res.status(200).json({ deleted: vendorId })
        }
        res.status(404).json({ error: "Vendor not found" })
    } catch (error) {
        res.status(404).json({ error: "Error while deleting vendor" })
    }
}