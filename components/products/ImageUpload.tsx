'use client'

import { CldUploadWidget } from "next-cloudinary"
import { TbPhotoPlus } from "react-icons/tb"

export default function ImageUpload() {
    return (
        <CldUploadWidget 
            uploadPreset="fresh-coffee"
            options={{
                maxFiles: 1,
            }}
            onSuccess={(result, {widget}) => {
                widget.close()
                console.log(result)
            }}
        >
            { ({ open }) => (
                <>
                    <div className="space-y-2">
                        <label className="text-slate-800" htmlFor="image">Imagen del Producto:</label>
                        <div 
                            className="relative cursor-pointer hover:opacity-70 transition p-10 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600 bg-slate-100 rounded-md"
                            onClick={() => open()}
                        >
                            <TbPhotoPlus 
                                size={50}
                            />
                            <p className="text-lg font-semibold">Agregar Imagen</p>
                        </div>
                    </div>

                </>
            ) }
        </CldUploadWidget>
    )
}