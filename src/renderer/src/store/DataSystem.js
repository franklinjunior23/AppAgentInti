import { create } from 'zustand'

export const DataInformationPC = create((set) => ({
  iDDispositivo: localStorage.getItem('IdDispositivo') ?? 0,
  TokenAuthOpen: false,
  data: [],
  TrueOpenAuth: () => set(() => ({ TokenAuthOpen: true })),
  CloseOpenAuth: () => set(() => ({ TokenAuthOpen: false })),
  AddData: (data) => set(() => ({ data: [data] })),
  AddDispositivoId: (data) => set(() => ({ iDDispositivo: data }))
}))
