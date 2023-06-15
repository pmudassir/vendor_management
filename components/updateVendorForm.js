import { useReducer } from "react"
import { BiBrush } from 'react-icons/bi'
import Success from "./success"
import Bug from "./bug"
import { useQuery, useMutation, useQueryClient } from "react-query"
import { getVendor, getVendors, updateVendor } from "../lib/helper"

export default function UpdateVendorForm({ formId, formData, setFormData }) {

    const queryClient = useQueryClient()
    const { isLoading, isError, data, error } = useQuery(['vendors', formId], () => getVendor(formId))
    const UpdateMutation = useMutation((newData) => updateVendor(formId, newData), {
        onSuccess: async (data) => {
            queryClient.prefetchQuery('vendors', getVendors)
        }
    })

    if (isLoading) {
        return <div>Loading...!</div>
    }
    if (isError) {
        return <div>Error</div>
    }

    const { vendorName, bankAccountNumber, bankName, addressLine1, addressLine2, city, country, zipCode } = data;

    const handleSubmit = async (e) => {
        e.preventDefault();
        let updated = Object.assign({}, data, formData)
        await UpdateMutation.mutate(updated)
    }

    return (
        <form className="grid lg:grid-cols-2 w-4/6 gap-4" onSubmit={handleSubmit}>
            <div className="input-type">
                <input type="text" onChange={setFormData} defaultValue={vendorName} name="vendorName" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Vendor Name" />
            </div>
            <div className="input-type">
                <input type="number" onChange={setFormData} defaultValue={bankAccountNumber} name="bankAccountNumber" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Bank Acc. No." />
            </div>
            <div className="input-type">
                <input type="text" onChange={setFormData} defaultValue={bankName} name="bankName" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Bank Name" />
            </div>
            <div className="input-type">
                <input type="text" onChange={setFormData} defaultValue={addressLine1} name="addressLine1" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Address Line 1" />
            </div>
            <div className="input-type">
                <input type="text" onChange={setFormData} defaultValue={addressLine2} name="addressLine2" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Address Line 2" />
            </div>
            <div className="input-type">
                <input type="text" onChange={setFormData} defaultValue={city} name="city" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="City" />
            </div>
            <div className="input-type">
                <input type="text" onChange={setFormData} defaultValue={country} name="country" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Country" />
            </div>
            <div className="input-type">
                <input type="number" onChange={setFormData} defaultValue={zipCode} name="zipCode" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Zip Code" />
            </div>
            <button className="flex justify-center text-md w-2/6 bg-yellow-400 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500">
                Update <span className="px-1"><BiBrush size={24}></BiBrush></span>
            </button>
        </form>
    )
}