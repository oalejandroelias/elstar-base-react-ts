import PublicacionForm, {
    FormModel,
    SetSubmitting,
} from '@/views/publicacion/PublicacionForm'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import { useNavigate } from 'react-router-dom'
import { apiSavePublicacion } from '@/services/PublicacionService'
import { AnyARecord } from 'dns'
import { useState } from 'react'

const PublicacionNew = () => {
    const navigate = useNavigate()

    const addPublicacion = async (data2: FormModel) => {
        const data = new FormData()
        data.append('img', data2.imgList[0])
        //const response = await apiSavePublicacion<boolean, FormModel>({data})
        const response = await apiSavePublicacion<boolean, FormModel>({ data })
        return response.data
    }

    const handleFormSubmit = async (
        values: FormModel,
        setSubmitting: SetSubmitting,
    ) => {
        setSubmitting(true)
        const success = await addPublicacion(values)
        setSubmitting(false)
        if (success) {
            toast.push(
                <Notification
                    title={'Successfuly added'}
                    type="success"
                    duration={2500}
                >
                    Publicación guardada correctamente
                </Notification>,
                {
                    placement: 'top-center',
                },
            )
            navigate('/app/publicacion/publicacion-list')
        }
    }

    const handleDiscard = () => {
        navigate('/app/publicacion/publicacion-list')
    }

    return (
        <>
            <PublicacionForm
                type="new"
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}
            />
        </>
    )
}

export default PublicacionNew

// import React, { useState, ChangeEvent } from 'react';
// import axios from 'axios';

// const ImageUploadComponent: React.FC = () => {
//   const [file, setFile] = useState<File | null>(null);

//   const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       const selectedFile = e.target.files[0];
//       setFile(selectedFile);
//       const archivo = new FileReader;

//       archivo.onload = function(){
//         console.log('archivo',archivo.result)
//       }

//       archivo.readAsDataURL(e.target.files[0])
//     }

//   };

//   const handleImageUpload = (e: React.SyntheticEvent) => {
//     if (!file) {
//       console.error('No se ha seleccionado ninguna imagen.');
//       return;
//     }

//     e.preventDefault()

//     console.log('img', file)

//     const formData = new FormData();
//     formData.append('img', file);

//     axios.post<{ imageURL: string }>('http://localhost:3000/api/publicaciones', formData)
//       .then((response) => {
//         console.log('Respuesta del servidor:', response.data);
//         // Aquí puedes manejar la respuesta del servidor
//       })
//       .catch((error) => {
//         console.error('Error al subir la imagen:', error);
//         // Aquí puedes manejar errores en la subida de la imagen
//       });
//   };

//   return (
//     <div className="">
//       <input type="file" accept="image/*" name="img" onChange={handleImageChange} />
//       <button onClick={handleImageUpload}>Subir imagen</button>
//     </div>
//   );
// };

// export default ImageUploadComponent;
