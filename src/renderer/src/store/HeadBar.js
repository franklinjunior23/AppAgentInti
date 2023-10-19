import { create } from 'zustand'

export const BarStorage = create((set) => ({
  bar: false,
  ChangeBar: () => set((state) => ({ bar: !state.bar }))
}))
