import PublicacionForm, {
    FormModel,
    SetSubmitting,
} from '@/views/publicacion/PublicacionForm'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import { useNavigate } from 'react-router-dom'
//import { apiCreateSalesProduct } from '@/services/PublicacionService'

const PublicacionNew = () => {
    const navigate = useNavigate()

    const addProduct = async (data: FormModel) => {
        // const response = await apiCreateSalesProduct<boolean, FormModel>(data)
        // return response.data

        /**Borrar */
        return 1;
    }

    const handleFormSubmit = async (
        values: FormModel,
        setSubmitting: SetSubmitting
    ) => {
        setSubmitting(true)
        const success = await addProduct(values)
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
