import connectMongo from "../../../database/conn"
import { deleteVendors, getVendor, putVendors } from "../../../database/controller"

export default async function handler(req, res) {
    connectMongo().catch(() => res.status(405).json({ error: "Error in the connection" }))
    const { method } = req
    if (method === "GET") {
        await getVendor(req, res)
    } else if (method === "PUT") {
        await putVendors(req, res)
    } else if (method === "DELETE") {
        await deleteVendors(req, res)
    }
}