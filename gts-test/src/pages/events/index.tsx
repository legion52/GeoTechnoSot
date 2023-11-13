import { useAppSelector } from '../../app/store';
import { CardsPanel } from '../../widgets/cardsPanel';
import { TablePanel } from '../../widgets/tablePanel';

export const EventsPage = () => {

    const data = useAppSelector(state => state.order.filteredOreders)
    const panelType = useAppSelector(state => state.order.displayType)

    return (
        <div className='mt-5'>
            {panelType === 'table' ? <TablePanel data={data} /> : <CardsPanel data={data} />}
        </div>
    )
}
