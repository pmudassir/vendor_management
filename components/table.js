import { BiEdit, BiTrashAlt } from "react-icons/bi";
import { getVendors } from "../lib/helper";
import { useQuery } from 'react-query';
import { useSelector, useDispatch } from 'react-redux'
import { toggleChangeAction, updateAction, deleteAction } from '../redux/reducer'

export default function Table() {

    const { isLoading, isError, data, error } = useQuery('vendors', getVendors)

    if (isLoading) {
        return <div>Vendors List is Loading...</div>;
    }
    if (isError) {
        return <div>Got Error {error}</div>
    }

    return (
        <table className="min-w-full table-auto">
            <thead>
                <tr className="bg-gray-800">
                    <th className="px-16 py-2">
                        <span className="text-gray-200">Name</span>
                    </th>
                    <th className="px-16 py-2">
                        <span className="text-gray-200">Bank Acc No.</span>
                    </th>
                    <th className="px-16 py-2">
                        <span className="text-gray-200">Bank Name</span>
                    </th>
                    <th className="px-16 py-2">
                        <span className="text-gray-200">Actions</span>
                    </th>
                </tr>
            </thead>
            <tbody className="bg-gray-200">
                {
                    data && data.map((vendor) => <Tr key={vendor._id} _id={vendor._id} vendorName={vendor.vendorName} bankAccountNumber={vendor.bankAccountNumber} bankName={vendor.bankName} />)
                }
            </tbody>
        </table>
    )
}

function Tr({ _id, vendorName, bankAccountNumber, bankName }) {

    const visible = useSelector((state) => state.app.client.toggleForm)
    const dispatch = useDispatch()

    const onUpdate = () => {
        dispatch(toggleChangeAction(_id))
        if (visible) {
            dispatch(updateAction(_id))
        }
    }

    const onDelete = () => {
        if (!visible) {
            dispatch(deleteAction(_id))
        }
    }

    return (
        <tr className="bg-gray-50 text-center">
            <td className="px-16 py-2 flex flex-row items-center">

                <span className="text-center ml-2 font-semibold">{vendorName || "Unknown"}</span>
            </td>
            <td className="px-16 py-2">
                <span>{bankAccountNumber || "Unknown"}</span>
            </td>
            <td className="px-16 py-2">
                <span>{bankName || "Unknown"}</span>
            </td>
            <td className="px-16 py-2 flex justify-around gap-5">
                <button className="cursor" onClick={onUpdate} ><BiEdit size={25} color={"rgb(34,197,94)"}></BiEdit></button>
                <button className="cursor" onClick={onDelete} ><BiTrashAlt size={25} color={"rgb(244,63,94)"}></BiTrashAlt></button>
            </td>
        </tr>
    )
}