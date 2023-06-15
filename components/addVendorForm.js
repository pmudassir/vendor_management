import { BiPlus } from 'react-icons/bi'
import Success from "./success"
import Bug from "./bug"
import { useQueryClient, useMutation } from "react-query"
import { addVendor, getVendors } from "../lib/helper"

export default function AddVendorForm({ formData, setFormData }) {

    const queryClient = useQueryClient()
    const addMutation = useMutation(addVendor, {
        onSuccess: () => {
            queryClient.prefetchQuery('vendors', getVendors)
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        if (Object.keys(formData).length == 0) {
            return console.log("Don't have Form Data");
        }
        let { vendorName, bankAccountNumber, bankName, addressLine1, addressLine2, city, country, zipCode } = formData;
        const model = { vendorName, bankAccountNumber, bankName, addressLine1, addressLine2, city, country, zipCode }
        addMutation.mutate(model)
    }

    if (addMutation.isLoading) {
        return <div>Loading!</div>
    }
    if (addMutation.isError) {
        return <Bug message={addMutation.error.message}></Bug>
    }
    if (addMutation.isSuccess) {
        return <Success message={"Added Successfully"}></Success>
    }

    return (
        <form className="grid lg:grid-cols-2 w-4/6 gap-4" onSubmit={handleSubmit}>
            <div className="input-type">
                <input type="text" onChange={setFormData} name="vendorName" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Vendor Name" />
            </div>
            <div className="input-type">
                <input type="number" onChange={setFormData} name="bankAccountNumber" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Bank Acc. No." />
            </div>
            <div className="input-type">
                <input type="text" onChange={setFormData} name="bankName" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Bank Name" />
            </div>
            <div className="input-type">
                <input type="text" onChange={setFormData} name="addressLine1" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Address Line 1" />
            </div>
            <div className="input-type">
                <input type="text" onChange={setFormData} name="addressLine2" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Address Line 2" />
            </div>
            <div className="input-type">
                <input type="text" onChange={setFormData} name="city" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="City" />
            </div>
            <div className="input-type">
                <input type="text" onChange={setFormData} name="country" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Country" />
            </div>
            <div className="input-type">
                <input type="number" onChange={setFormData} name="zipCode" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Zip Code" />
            </div>
            <button type="submit" className="flex justify-center text-md w-2/6 bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500">
                Add <span className="px-1"><BiPlus size={24}></BiPlus></span>
            </button>
        </form>
    )
}