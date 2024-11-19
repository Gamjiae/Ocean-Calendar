import { create } from 'zustand';

interface Beach {
    beach: string;
    setBeach: (beach: string) => void;
} 

export const useBeachStore = create<Beach>((set)=>({
    beach: "",
    setBeach: (b) => {
        set((state) => ({ beach: b}))
    }
}))