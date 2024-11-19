import { create } from 'zustand';

interface Beach {
    beachName: string;
    beachNum: number;
    setBeach: (name: string, num: number) => void;
} 

export const useBeachStore = create<Beach>((set)=>({
    beachName: "",
    beachNum: 1,
    setBeach: (name: string, num: number) => {
        set({ beachName: name, beachNum: num})
    }
}))