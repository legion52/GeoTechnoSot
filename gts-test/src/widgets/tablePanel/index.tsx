import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import React, { FC, useEffect, useRef, useState } from 'react'
import { Orders } from '../../shared/types'
import { Tag } from 'primereact/tag'
import { formatTimestamp } from '../../shared/hooks'
import { useAppDispatch } from '../../app/store'
import { setRead } from '../../entities/orders/orderSlice'
interface ITablePanel {
    data: Orders[]
}
export const TablePanel: FC<ITablePanel> = ({ data }) => {
    const thead = [
        { field: "date", header: "Дата" },
        { field: "priority", header: "Важность" },
        { field: "equipment", header: "Оборудование" },
        { field: "message", header: "Сообщение" },
        { field: "responsible", header: "Ответственный" },
    ]
    const ref = useRef('')
    const [selectedRow, setSelectedRow] = useState('');
    const dispatch = useAppDispatch()



    const handleSpaceKeyPress = (event: any) => {
        if (event.code === 'Space' && ref.current.length) {
            dispatch(setRead(ref.current))
            ref.current = ''
            setSelectedRow('');
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleSpaceKeyPress);
        return () => {
            window.removeEventListener('keydown', handleSpaceKeyPress);
        };
    }, []);


    const handleRowClick1 = (event: any) => {
        const clickedRowData = event.data.id;
        ref.current = ref.current !== clickedRowData ? clickedRowData : ''
        setSelectedRow(prev => prev !== clickedRowData ? clickedRowData : '');
    }


    const getOrderSeverity = (product: Orders) => {
        switch (product.priority) {
            case 1:
                return 'success';

            case 2:
                return 'warning';

            case 3:
                return 'danger';

            default:
                return 'success';
        }
    };

    const getOrderValue = (product: Orders) => {
        switch (product.priority) {
            case 1:
                return 'Низкая';

            case 2:
                return 'Высокая';

            case 3:
                return 'Критическая';

            default:
                return 'success';
        }
    };

    return (
        <div className='w-screen p-3'>
            <DataTable scrollable value={data} paginator rows={8}
                size='small'
                removableSort
                pt={{
                    root: { className: 'relative  h-full w-full ' },
                    table: { className: '' },
                    thead: { className: 'bg-slate-50 top-0 z-[1] ' },
                    wrapper: { className: '' },
                    paginator: {}
                }}
                rowClassName={(rowData) =>
                    `${(rowData.id === ref.current ? 'bg-[#B9FFF7]' : '')} ${(rowData.status === 1 ? 'bg-[#BEFFB9]' : '')}`
                }
                onRowClick={(event) => handleRowClick1(event)}
            >
                {thead.map(el => <Column
                    sortable={el.field === 'priority'}
                    key={el.field}
                    field={el.field}
                    header={el.header}
                    body={(e) => {

                        if (el.field === 'priority') {
                            return <Tag severity={getOrderSeverity(e)}>{getOrderValue(e)}</Tag>
                        }
                        else if (el.field === 'date') {
                            return formatTimestamp(e[el.field])
                        }
                        else {
                            return e[el.field]
                        }
                    }
                    }
                ></Column>)}
            </DataTable>
        </div>
    )
}

