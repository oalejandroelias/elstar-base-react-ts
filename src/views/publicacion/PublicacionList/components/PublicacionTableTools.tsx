import Button from '@/components/ui/Button'
import { HiDownload, HiPlusCircle } from 'react-icons/hi'
import PublicacionTableSearch from './PublicacionTableSearch'
//import Pub from './ProductFilter'
import { Link } from 'react-router-dom'

const PublicacionTableTools = () => {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center">
            <PublicacionTableSearch />
            {/* <ProductFilter /> */}
            <Link
                download
                className="block lg:inline-block md:mx-2 md:mb-0 mb-4"
                to="/data/product-list.csv"
                target="_blank"
            >
                <Button block size="sm" icon={<HiDownload />}>
                    Exportar
                </Button>
            </Link>
            <Link
                className="block lg:inline-block md:mb-0 mb-4"
                to="/app/publicacion/publicacion-new"
            >
                <Button block variant="solid" size="sm" icon={<HiPlusCircle />}>
                    Nuevo
                </Button>
            </Link>
        </div>
    )
}

export default PublicacionTableTools
