'use client'

import { deleteTemplate } from "@/utils/templateControllers"

interface DeleteButtonProps {
    id: number,
}

export default function DeleteButton({id}: DeleteButtonProps) {

        const handleDelete = () => {
        if (confirm("Seguro que quieres eliminar esta plantilla ?")) {
            deleteTemplate(id)
                .then(()=>{
                    location.reload()
                })
        }
    }

    return (
        <button onClick={handleDelete}>Borrar</button>
    )
}