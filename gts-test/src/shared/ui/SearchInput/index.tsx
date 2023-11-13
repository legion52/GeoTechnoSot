import { InputText } from 'primereact/inputtext'
import React, { FC } from 'react'

interface ISearchInput {
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}
export const SearchInput: FC<ISearchInput> = ({ value, onChange }) => {
    return (
        <span className="p-input-icon-right flex gap-2 ">
            <i className="pi pi-search" />
            <InputText placeholder="Поиск" value={value} onChange={onChange}
                pt={{
                    root: { className: 'bg-[#EDEDED] h-10 rounded-[17px] p-1 px-3 outline-none border-none' },
                }} />
        </span>
    )
}
