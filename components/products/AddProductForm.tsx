'use client'

export default function AddProductForm({ children }: { children: React.ReactNode }) {

    const handleSubmit = async (formData: FormData) => {
        // const data = {
        //     name: formData.get('name'),
        //     price: formData.get('price'),
        //     categoryId: formData.get('categoryId'),
        // }
        console.log('desde handleSubmit')
    }

    return (
        <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md max-w-2xl mx-auto">
            <form
                className="space-y-5"
                action={handleSubmit}
            >
                { children }

                <input 
                    type="submit" 
                    className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
                    value="Registrar Producto"
                />
            </form>
        </div>
    )
}