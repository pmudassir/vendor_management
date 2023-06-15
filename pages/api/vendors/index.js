import connectMongo from "../../../database/conn"
import { getVendors, postVendors } from "../../../database/controller"


export default async function handler(req, res) {
    connectMongo().catch(() => res.status(405).json({ error: "Error in the connection" }))

    const { method } = req

    if (method === "GET") {
        await getVendors(req, res)
    } else if (method === "POST") {
        await postVendors(req, res)
    }
}