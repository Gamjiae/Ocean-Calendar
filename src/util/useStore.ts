import { create } from 'zustand';

interface Beach {
    beachName: string;
    beachNum: number;
    setBeach: (name: string, num: number) => void;
}

export const useBeachStore = create<Beach>((set)=>({
    beachName: "을왕리 해수욕장",
    beachNum: 1,
    setBeach: (name: string, num: number) => {
        set({ beachName: name, beachNum: num})
    }
}))