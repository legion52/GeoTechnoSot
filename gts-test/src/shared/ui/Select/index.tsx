import { SelectButton } from 'primereact/selectbutton'
import React, { FC } from 'react'

interface ISelect {
    value: any
    onChange: (e: any) => void
    options: any
}
export const Select: FC<ISelect> = ({ value, onChange, options }) => {
    return (
        <div className="max-w-[188px]">
            <SelectButton value={value} onChange={onChange} options={options}
                pt={{
                    root: { className: 'flex bg-[#EDEDED] rounded-[17px] p-1 outline-none' },
                    button: ({ context }: { context: any }) => ({ className: ` rounded-[16px] px-2 py-1 outline-none border-none ${context.selected ? 'bg-[#2196F3] shadow-md' : 'bg-[#EDEDED]'}` }),
                    label: ({ context }: { context: any }) => ({ className: `outline-none ${context.selected ? 'text-white' : ''}` })
                }}
            />
        </div>
    )
}
