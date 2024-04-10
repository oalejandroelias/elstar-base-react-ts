import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import {
    toggleDeleteConfirmation,
    deletePublicacion,
    getPublicaciones,
    useAppDispatch,
    useAppSelector,
} from '../store'

const PublicacionDeleteConfirmation = () => {
    const dispatch = useAppDispatch()
    const dialogOpen = useAppSelector(
        (state) => state.tablePublicacionList.data.deleteConfirmation
    )
    const selectedPublicacion = useAppSelector(
        (state) => state.tablePublicacionList.data.selectedPublicacion
    )
    const tableData = useAppSelector(
        (state) => state.tablePublicacionList.data.tableData
    )

    const onDialogClose = () => {
        dispatch(toggleDeleteConfirmation(false))
    }

    const onDelete = async () => {
        dispatch(toggleDeleteConfirmation(false))
        const success = await deletePublicacion({ id: selectedPublicacion })

        if (success) {
            dispatch(getPublicaciones(tableData))
            toast.push(
                <Notification
                    title={'Successfuly Deleted'}
                    type="success"
                    duration={2500}
                >
                    Product successfuly deleted
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
        }
    }

    return (
        <ConfirmDialog
            isOpen={dialogOpen}
            type="danger"
            title="Eliminar publicación"
            confirmButtonColor="red-600"
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
            onCancel={onDialogClose}
            onConfirm={onDelete}
        >
            <p>
                Está seguro/a de borrar la publicación?
            </p>
        </ConfirmDialog>
    )
}

export default PublicacionDeleteConfirmation
