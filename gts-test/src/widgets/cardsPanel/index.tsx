import React, { FC, useEffect, useRef, useState } from 'react'
import { Orders } from '../../shared/types'
import { Card } from 'primereact/card'
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator'
import { formatTimestamp } from '../../shared/hooks'
import { useAppDispatch } from '../../app/store'
import { setRead } from '../../entities/orders/orderSlice'

interface ICardsPanel {
    data: Orders[]
}

interface IPriority {
    [key: number]: string | number;
}

export const CardsPanel: FC<ICardsPanel> = ({ data }) => {
    const [first, setFirst] = useState<number>(0);
    const priority: IPriority = {
        1: 'Низкая',
        2: 'Высокая',
        3: 'Критическая',
    }

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


    const handleRowClick1 = (id: string) => {
        ref.current = ref.current !== id ? id : ''
        setSelectedRow(prev => prev !== id ? id : '');
    }


    const onPageChange = (event: PaginatorPageChangeEvent) => {
        setFirst(event.first);

    };


    const Tag = ({ value }: { value: number }) => {
        const style = (value: number) => {
            switch (value) {
                case 1:
                    return 'bg-[#A8EAC2] text-center text-[#4F966B]';

                case 2:
                    return 'bg-[#FFE588] text-[#F9A400]';

                case 3:
                    return 'bg-[#FCECF2] text-[#E64980]';

                default:
                    return 'success';
            }
        };
        return (
            <div className={`flex items-center h-5 px-3 rounded-xl  text-center ${style(value)}`}>
                <span className={`text-[8px] `}>{priority[value]}</span>
            </div>
        )
    }


    return (
        <div>
            <div className='grid sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-5 '>
                {data.slice(first, first + 8).map(el => (
                    <Card
                        onClick={() => handleRowClick1(el.id)}
                        key={el.id}
                        header={
                            <div className='p-3'>
                                <div className='flex justify-between items-center gap-2'>
                                    <div className='flex items-center gap-3'>
                                        <div className='w-[44px] h-[44px] rounded-full bg-[#ECECEC] hidden md:block'></div>
                                        <div className=''><span className='font-medium md:text-base'>{el.responsible}</span></div>
                                    </div>
                                    {el.status === 1 &&
                                        <div className='flex items-center h-4 px-1 rounded-sm bg-[#A8EAC2] text-center text-[#4F966B]'><span className='text-[8px]'>Прочитано</span></div>
                                    }
                                </div>
                                <hr
                                    className={`mt-2`}
                                />
                            </div>
                        }
                        footer={
                            <div className='flex justify-between items-center flex-wrap h'>
                                <div className='flex items-center gap-2'>
                                    <div className=''><span className='text-sm'>Важность</span></div>
                                    <Tag value={el.priority} />
                                </div>
                                <div><span className='text-sm font-medium '>{formatTimestamp(el.date)}</span></div>
                            </div>
                        }
                        title={el.equipment}
                        subTitle={el.message}
                        pt={{
                            body: { className: 'pt-0' },
                            footer: { className: 'p-0 ' },
                            title: { className: ' text-sm md:text-xl ' },
                        }}
                        className={` shadow-3xl w-[360px] sm:w-[310px] md:w-[360px] lg:w-[320px] xl:w-[300px] md:rounded-[34px] ${el.id === ref.current ? 'bg-[#B9FFF7]' : ''} ${(el.status === 1 ? 'bg-[#BEFFB9]' : '')}`}></Card>
                ))}
            </div>
            <Paginator first={first} rows={8} totalRecords={data.length} onPageChange={onPageChange} template={{ layout: 'PrevPageLink CurrentPageReport NextPageLink' }} />
        </div>
    )
}
