export default function ProductSearchForm() {
    return (
        <form className="flex items-center gap-2">
            <input 
                type="text" 
                placeholder="Buscar producto..." 
                className="p-2 placeholder-gray-400 w-full bg-white rounded-md"
                name="search"
            />

            <input 
                type="submit"
                className="bg-indigo-600 p-2 uppercase text-white cursor-pointer rounded-md"
                value="Buscar"
            />
        </form>
    )
}