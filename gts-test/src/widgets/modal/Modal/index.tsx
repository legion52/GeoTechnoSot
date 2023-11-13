import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import { Toast } from 'primereact/toast'
import React, { ChangeEvent, FC, useRef, useState } from 'react'
import { useAppDispatch } from '../../../app/store'
import { addEvent } from '../../../entities/orders/orderSlice'

interface iModal {
  visible: boolean
  setVisible: (v: any) => void
}

interface IPriority {
  name: string;
  value: number;
}

interface IForm {
  equipment: string;
  message: string;
  responsible: string;
  [key: string]: string | number;
}

export const Modal: FC<iModal> = ({ visible, setVisible }) => {
  const [form, setForm] = useState<IForm>({
    equipment: '',
    message: '',
    responsible: '',
  },)
  const [selectedPriority, setSelectedPriority] = useState<IPriority | null>(null);
  const toast = useRef<Toast>(null);
  const priority: IPriority[] = [
    { name: 'Низкая', value: 1 },
    { name: 'Высокая', value: 2 },
    { name: 'Критическая', value: 3 },
  ];
  const dispatch = useAppDispatch()


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const addOrder = (e: any) => {
    e.preventDefault()
    if (Object.keys(form).every((el) => form[el] !== '')) {
      setVisible(false)
      setForm({
        equipment: '',
        message: '',
        responsible: '',
      })
      setSelectedPriority(null)
      setTimeout(() => {
        dispatch(addEvent({
          ...form,
          priority: selectedPriority
        }))
        toast.current?.show({ severity: 'success', summary: 'Успешно', detail: 'Событие добавлено в список!', life: 3000 });
      }, 3000)
    } else {
      toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Заполните все поля!', life: 3000 });

    }
  }

  return (
    <>
      <Toast ref={toast} />
      <Dialog header="Добавить событие" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}
        draggable={false}
        maximizable
      >
        <form onSubmit={addOrder}>
          <div className='flex flex-col gap-2'>
            <InputText value={form.responsible} onChange={handleChange} type="text" name='responsible' className="p-inputtext-sm" placeholder="Ответственный" />

            <InputText value={form.equipment} onChange={handleChange} type="text" className="p-inputtext-sm"
              name='equipment' placeholder="Оборудование" />

            <Dropdown
              value={selectedPriority} onChange={(e: DropdownChangeEvent) => setSelectedPriority(e.value)}
              options={priority} optionLabel="name"
              placeholder="Важность" className="w-full md:w-14rem" />

            <InputText value={form.message} onChange={handleChange} type="text" className="p-inputtext-sm"
              name='message' placeholder="Сообщение" />

            <Button label='Добавить' />
          </div></form>
      </Dialog></>
  )
}
