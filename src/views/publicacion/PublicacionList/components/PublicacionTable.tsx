import { useEffect, useMemo, useRef } from 'react'
import Avatar from '@/components/ui/Avatar'
import Badge from '@/components/ui/Badge'
import DataTable from '@/components/shared/DataTable'
import { HiOutlineEye, HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import { FiPackage } from 'react-icons/fi'
import { GrDocumentPdf } from "react-icons/gr";
import {
    getPublicaciones,
    setTableData,
    toggleDeleteConfirmation,
    useAppDispatch,
    useAppSelector,
    setSelectedPublicacion,
} from '../store'
import useThemeClass from '@/utils/hooks/useThemeClass'
//import ProductDeleteConfirmation from './ProductDeleteConfirmation'
import { useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import type {
    DataTableResetHandle,
    OnSortParam,
    ColumnDef,
} from '@/components/shared/DataTable'
import PublicacionDeleteConfirmation from './PublicacionDeleteConfirmation'

type Publicacion = {
    Id: string
    Archivo: string
    Documento: string
    Titulo: string
    img: string
    Anio: string
}


// const inventoryStatusColor: Record<
//     number,
//     {
//         label: string
//         dotClass: string
//         textClass: string
//     }
// > = {
//     0: {
//         label: 'In Stock',
//         dotClass: 'bg-emerald-500',
//         textClass: 'text-emerald-500',
//     },
//     1: {
//         label: 'Limited',
//         dotClass: 'bg-amber-500',
//         textClass: 'text-amber-500',
//     },
//     2: {
//         label: 'Out of Stock',
//         dotClass: 'bg-red-500',
//         textClass: 'text-red-500',
//     },
// }

const ActionColumn = ({ row }: { row: Publicacion }) => {
    const dispatch = useAppDispatch()
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onEdit = () => {
        navigate(`/app/publicacion/publicacion-edit/${row.Id}`)
    }

    const onDelete = () => {
        dispatch(toggleDeleteConfirmation(true))
        dispatch(setSelectedPublicacion(row.Id))
    }

    return (
        <div className="flex justify-end text-lg">
            <span
                className={`cursor-pointer p-2 hover:${textTheme}`}
                onClick={onEdit}
            >
                <HiOutlineEye />
            </span>
            <span
                className={`cursor-pointer p-2 hover:${textTheme}`}
                onClick={onEdit}
            >
                <HiOutlinePencil />
            </span>
            <span
                className="cursor-pointer p-2 hover:text-red-500"
                onClick={onDelete}
            >
                <HiOutlineTrash />
            </span>
        </div>
    )
}

const PublicacionColumn = ({ row }: { row: Publicacion }) => {
    const avatar = row.img ? (
        <Avatar src={row.img} />
    ) : (
        <Avatar className='bg-inherit text-indigo-600' icon={<GrDocumentPdf />} />
    )

    return (
        <div className="flex items-center">
            {avatar}
            <span className={`ml-2 rtl:mr-2 font-semibold`}>{row.Titulo}</span>
        </div>
    )
}

const PublicacionTable = () => {
    const tableRef = useRef<DataTableResetHandle>(null)

    const dispatch = useAppDispatch()

    const { pageIndex, pageSize, sort, query, total } = useAppSelector(
        (state) => state.tablePublicacionList.data.tableData
    )

    const filterData = useAppSelector(
        (state) => state.tablePublicacionList.data.filterData
    )

    const loading = useAppSelector(
        (state) => state.tablePublicacionList.data.loading
    )

    const data = useAppSelector(
        (state) => state.tablePublicacionList.data.publicacionList
    )

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageIndex, pageSize, sort])

    useEffect(() => {
        if (tableRef) {
            tableRef.current?.resetSorting()
        }
    }, [filterData])

    const tableData = useMemo(
        () => ({ pageIndex, pageSize, sort, query, total }),
        [pageIndex, pageSize, sort, query, total]
    )

    const fetchData = () => {
        dispatch(getPublicaciones({ pageIndex, pageSize, sort, query, filterData }))
    }

    const columns: ColumnDef<Publicacion>[] = useMemo(
        () => [
            {
                header: 'Titulo',
                accessorKey: 'titulo',
                cell: (props) => {
                    const row = props.row.original
                    return <PublicacionColumn row={row} />
                },
            },
            // {
            //     header: 'Archivo',
            //     accessorKey: 'archivo',
            //     cell: (props) => {
            //         const row = props.row.original
            //         return <span className="capitalize">{row.Archivo}</span>
            //     },
            // },
            {
                header: 'Año',
                accessorKey: 'archivo',
                cell: (props) => {
                    const { Anio } = props.row.original
                    return <span className="capitalize">{Anio}</span>
                },
            },
            // {
            //     header: 'Quantity',
            //     accessorKey: 'stock',
            //     sortable: true,
            // },
            // {
            //     header: 'Status',
            //     accessorKey: 'status',
            //     cell: (props) => {
            //         const { status } = props.row.original
            //         return (
            //             <div className="flex items-center gap-2">
            //                 <Badge
            //                     className={
            //                         inventoryStatusColor[status].dotClass
            //                     }
            //                 />
            //                 <span
            //                     className={`capitalize font-semibold ${inventoryStatusColor[status].textClass}`}
            //                 >
            //                     {inventoryStatusColor[status].label}
            //                 </span>
            //             </div>
            //         )
            //     },
            // },
            {
                header: 'Documento',
                accessorKey: 'documento',
                cell: (props) => {
                    const { Documento } = props.row.original
                    return <span>{Documento}</span>
                },
            },
            {
                header: '',
                id: 'action',
                cell: (props) => <ActionColumn row={props.row.original} />,
            },
        ],
        []
    )

    const onPaginationChange = (page: number) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageIndex = page
        dispatch(setTableData(newTableData))
    }

    const onSelectChange = (value: number) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageSize = Number(value)
        newTableData.pageIndex = 1
        dispatch(setTableData(newTableData))
    }

    const onSort = (sort: OnSortParam) => {
        const newTableData = cloneDeep(tableData)
        newTableData.sort = sort
        dispatch(setTableData(newTableData))
    }

    return (
        <>
            <DataTable
                ref={tableRef}
                selectable={false}
                columns={columns}
                data={data}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ className: 'rounded-md' }}
                loading={loading}
                pagingData={{
                    total: tableData.total as number,
                    pageIndex: tableData.pageIndex as number,
                    pageSize: tableData.pageSize as number,
                }}
                onPaginationChange={onPaginationChange}
                onSelectChange={onSelectChange}
                onSort={onSort}
            />
            <PublicacionDeleteConfirmation />
        </>
    )
}

export default PublicacionTable
