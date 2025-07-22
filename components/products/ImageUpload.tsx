'use client'

import { CldUploadWidget } from "next-cloudinary"
import { useState } from "react"
import { TbPhotoPlus } from "react-icons/tb"
import Image from "next/image"

export default function ImageUpload() {
    const [imageUrl, setImageUrl] = useState('')

    return (
        <CldUploadWidget 
            onSuccess={(result, {widget}) => {
                if(result.event === 'success') {
                    widget.close()
                    // @ts-ignore
                    setImageUrl(result.info?.secure_url)
                }
            }}
            uploadPreset="fresh-coffee"
            options={{
                maxFiles: 1,
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

                            { imageUrl && (
                                <div
                                    className="absolute insert-0 w-full h-full"
                                > 
                                    <Image
                                        fill
                                        style={{ objectFit: 'contain' }}
                                        src={imageUrl}
                                        alt="Imagen del Producto"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <input
                        type="hidden"
                        name="image"
                        value={imageUrl}
                    />

                </>
            ) }
        </CldUploadWidget>
    )
}