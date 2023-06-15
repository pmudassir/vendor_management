const BASE_URL = "http://localhost:3000/"

export const getVendors = async () => {
    const response = await fetch(`${BASE_URL}api/vendors`)
    const json = await response.json()
    return json;
}

export const getVendor = async (vendorId) => {
    const response = await fetch(`${BASE_URL}api/vendors/${vendorId}`);
    const json = await response.json()
    if (json) {
        return json;
    }
    return {}
}

export async function addVendor(formData) {
    try {
        const Options = {
            method: 'POST',
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify(formData)
        }
        const response = await fetch(`${BASE_URL}api/vendors`, Options)
        const json = await response.json()
        return json;
    } catch (error) {
        return error;
    }
}

export async function updateVendor(vendorId, formData) {
    const Options = {
        method: 'PUT',
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify(formData)
    }
    const response = await fetch(`${BASE_URL}api/vendors/${vendorId}`, Options)
    const json = await response.json()
    return json;
}

export async function deleteVendor(vendorId) {
    const Options = {
        method: 'DELETE',
        headers: { 'Content-Type': "application/json" },
    }
    const response = await fetch(`${BASE_URL}api/vendors/${vendorId}`, Options)
    const json = await response.json()
    return json;
}