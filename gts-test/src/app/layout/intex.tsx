import { useDebounce } from 'primereact/hooks';
import { FC, ReactNode, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store';
import { setDisplay, setFilter } from '../../entities/orders/orderSlice';
import { SelectButton } from 'primereact/selectbutton';
import { SearchInput } from '../../shared/ui/SearchInput';
import { Modal } from '../../widgets/modal/Modal';
import { ButtonAdd } from '../../shared/ui/ButtonAdd';
import { Select } from '../../shared/ui/Select';

interface ILayout {
    children: ReactNode
}

export const Layout: FC<ILayout> = ({ children }) => {
    const options = [
        { label: 'Таблица', value: 'table' },
        { label: 'Карточки', value: 'cards' },
    ];
    const [value, setValue] = useState(options[0].value);
    const [inputValue, debouncedValue, setInputValue] = useDebounce('', 800);
    const [visible, setVisible] = useState<boolean>(false);

    const dispatch = useAppDispatch()
    const displayType = useAppSelector(state => state.order.displayType)

    const switchPanel = (value: string | null) => {
        if (value !== null) {
            setValue(value)
            dispatch(setDisplay(value))
        }
    }

    useEffect(() => {
        dispatch(setFilter(debouncedValue))
    }, [debouncedValue])

    return (
        <div className='flex flex-col h-full '>
            <Modal visible={visible} setVisible={setVisible} />
            <div className='flex flex-col items-center gap-2 sm:flex-row sm:justify-between p-5'>
                <Select value={displayType || value} onChange={(e) => switchPanel(e.value)} options={options} />
                <div className='flex gap-2 sm:flex-row-reverse'>
                    <SearchInput value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                    <ButtonAdd oneClick={() => setVisible(prev => !prev)} />
                </div>
            </div>
            <div className='flex justify-center px-2 md:px-5 pb-3'>
                {children}
            </div>

        </div>
    )
}

