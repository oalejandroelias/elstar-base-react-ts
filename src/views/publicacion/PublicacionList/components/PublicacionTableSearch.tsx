import { useRef, useState } from 'react'
import Input from '@/components/ui/Input'
import { HiOutlineSearch } from 'react-icons/hi'
import {
    getPublicaciones,
    setTableData,
    useAppSelector,
    useAppDispatch,
} from '../store'
import debounce from 'lodash/debounce'
import cloneDeep from 'lodash/cloneDeep'
import type { TableQueries } from '@/@types/common'
import type { ChangeEvent } from 'react'

const PublicacionTableSearch = () => {

    const dispatch = useAppDispatch()

    const searchInput = useRef(null)

    const tableData = useAppSelector(
        (state) => state.tablePublicacionList.data.tableData
    )

    const [inputValue, setInputValue] = useState(tableData.query);

    const debounceFn = debounce(handleDebounceFn, 500)

    function handleDebounceFn(val: string) {
        const newTableData = cloneDeep(tableData)
        newTableData.query = val
        newTableData.pageIndex = 1
        if (typeof val === 'string' && val.length > 1) {
            fetchData(newTableData)
        }

        if (typeof val === 'string' && val.length === 0) {
            fetchData(newTableData)
        }
    }

    const fetchData = (data: TableQueries) => {
        dispatch(setTableData(data))
        dispatch(getPublicaciones(data))
    }

    const onEdit = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        debounceFn(e.target.value);
    };

    return (
        <Input
            ref={searchInput}
            value={inputValue}
            className="max-w-md md:w-52 md:mb-0 mb-4"
            size="sm"
            placeholder="Buscar"
            prefix={<HiOutlineSearch className="text-lg" />}
            onChange={onEdit}
        />
    )
}

export default PublicacionTableSearch
