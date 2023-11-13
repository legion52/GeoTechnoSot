import { Button } from 'primereact/button'
import React, { FC } from 'react'

interface IButtonAdd {
    oneClick:()=>void
}
export const ButtonAdd: FC<IButtonAdd> = ({oneClick}) => {
    return (
        <Button
            onClick={oneClick}
            pt={{
                root: { className: 'w-10 h-10 bg-[#ededed] border-none' },
                icon: { className: 'text-[#495057]' }
            }}
            icon="pi pi-plus" rounded aria-label="Filter" />
    )
}
