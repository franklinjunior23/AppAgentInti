import { create } from 'zustand'

export const DataInformationPC = create((set) => ({
  data: [],
  AddData: (data) => set(() => ({ data: [data] }))
}))
