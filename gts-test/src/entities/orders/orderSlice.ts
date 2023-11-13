import { createSlice } from "@reduxjs/toolkit";
import { Orders } from "../../shared/types";
import { mock } from "./consts";


interface IinitialState {
    orders: Orders[]
    filteredOreders: Orders[]
    displayType: string
    cardPage: number
}
const orderSlice = createSlice({
    name: "orders",
    initialState: {
        orders: mock,
        filteredOreders: mock,
        displayType: 'table',
        cardPage: 0
    } as IinitialState,
    reducers: {
        setFilter(state, { payload }) {
            state.filteredOreders = state.orders.filter(el => el.message.toLowerCase().includes(payload.toLowerCase()))
        },
        setDisplay(state, { payload }) {
            state.displayType = payload
        },
        addEvent(state, { payload }) {
            const newEvent = {
                id: `${Date.now()}`,
                date: `${Date.now()}`,
                priority: payload.priority,
                equipment: payload.equipment,
                message: payload.message,
                responsible: payload.responsible,
                status: 0
            };
            console.log(payload);
            state.orders.push(newEvent)
            state.filteredOreders.push(newEvent)
        },
        setRead(state, { payload }) {
            state.orders = state.orders.map((el) => el.id === payload ? { ...el, status: 1 } : el)
            state.filteredOreders = state.orders.map((el) => el.id === payload ? { ...el, status: 1 } : el)
        },
        setCurrentPage(state, { payload }) {
            state.cardPage = payload
        }
    }
})

export const { setFilter, setDisplay, addEvent, setRead, setCurrentPage } = orderSlice.actions
export default orderSlice.reducer
