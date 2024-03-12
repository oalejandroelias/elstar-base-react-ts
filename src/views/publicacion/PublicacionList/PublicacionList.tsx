import reducer from './store'
import { injectReducer } from '@/store'
import AdaptableCard from '@/components/shared/AdaptableCard'
import PublicacionTable from './components/PublicacionTable'
//import ProductTableTools from './components/ProductTableTools'

injectReducer('tablePublicacionList', reducer)

const PublicacionList = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Publicaciones</h3>
                {/* <ProductTableTools /> */}
            </div>
            <PublicacionTable />
        </AdaptableCard>
    )
}

export default PublicacionList