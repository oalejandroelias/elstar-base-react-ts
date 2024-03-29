import PublicacionForm, {
    FormModel,
    SetSubmitting,
} from '@/views/publicacion/PublicacionForm'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import { useNavigate } from 'react-router-dom'
import { apiSavePublicacion } from '@/services/PublicacionService'
import { AnyARecord } from 'dns'

const PublicacionNew = () => {
    const navigate = useNavigate()

    const addPublicacion = async (data: FormModel) => {
        const response = await apiSavePublicacion<boolean, FormModel>({data})
        return response.data
    }

    const handleFormSubmit = async (
        values: FormModel,
        setSubmitting: SetSubmitting
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
                }
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
