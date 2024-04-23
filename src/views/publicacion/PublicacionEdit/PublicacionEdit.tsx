import { useEffect } from 'react'
import Loading from '@/components/shared/Loading'
import DoubleSidedImage from '@/components/shared/DoubleSidedImage'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import reducer, {
    getPublicacion,
    updatePublicacion,
    deletePublicacion,
    useAppSelector,
    useAppDispatch,
} from './store'
import { injectReducer } from '@/store'
import { useLocation, useNavigate } from 'react-router-dom'

import PublicacionForm, {
    FormModel,
    SetSubmitting,
    OnDeleteCallback,
} from '@/views/publicacion/PublicacionForm'
import isEmpty from 'lodash/isEmpty'

injectReducer('publicacionEdit', reducer)

const PublicacionEdit = () => {
    const dispatch = useAppDispatch()

    const location = useLocation()
    const navigate = useNavigate()

    const publicacionData = useAppSelector(
        (state) => state.publicacionEdit.data.publicacionData
    )
    const loading = useAppSelector(
        (state) => state.publicacionEdit.data.loading
    )

    const fetchData = (data: { Id: string }) => {
        dispatch(getPublicacion(data))
    }

    const handleFormSubmit = async (
        values: FormModel,
        setSubmitting: SetSubmitting
    ) => {
        setSubmitting(true)
        const success = await updatePublicacion(values)
        setSubmitting(false)
        if (success) {
            popNotification('Actuaización')
        }
    }

    const handleDiscard = () => {
        navigate('/app/publicacion/publicacion-list')
    }

    const handleDelete = async (setDialogOpen: OnDeleteCallback) => {
        setDialogOpen(false)
        const success = await deletePublicacion({ Id: publicacionData.Id })
        if (success) {
            popNotification('deleted')
        }
    }

    const popNotification = (keyword: string) => {
        toast.push(
            <Notification
                title={`${keyword} Completada`}
                type="success"
                duration={2500}
            >
                {keyword} de la Publicación Completada
            </Notification>,
            {
                placement: 'top-center',
            }
        )
        navigate('/app/publicacion/publicacion-list')
    }

    useEffect(() => {
        const path = location.pathname.substring(
            location.pathname.lastIndexOf('/') + 1
        )
        const rquestParam = { Id: path }
        fetchData(rquestParam)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname])

    return (
        <>
            <Loading loading={loading}>
                {!isEmpty(publicacionData) && (
                    <>
                        <PublicacionForm
                            type="edit"
                            initialData={publicacionData}
                            onFormSubmit={handleFormSubmit}
                            onDiscard={handleDiscard}
                            onDelete={handleDelete}
                        />
                    </>
                )}
            </Loading>
            {!loading && isEmpty(publicacionData) && (
                <div className="h-full flex flex-col items-center justify-center">
                    <DoubleSidedImage
                        src="/img/others/img-2.png"
                        darkModeSrc="/img/others/img-2-dark.png"
                        alt="No product found!"
                    />
                    <h3 className="mt-8">No se encontró la publicación!</h3>
                </div>
            )}
        </>
    )
}

export default PublicacionEdit
