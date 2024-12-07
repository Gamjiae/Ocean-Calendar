import { create } from 'zustand';

interface BeachIf {
    beachName: string;
    beachNum: number;
    setBeach: (name: string, num: number) => void;
}

interface DateIf {
    date: Date
    setDate: (d: Date) => void;
}

interface ListOpenIf {
    isListOpen: boolean;
    setIsListOpen: (isOpen: boolean) => void;
}

export const useBeachStore = create<BeachIf>((set) => ({
    beachName: "을왕리 해수욕장",
    beachNum: 1,
    setBeach: (name: string, num: number) => {
        set({ beachName: name, beachNum: num})
    }
}))

export const useDateStore = create<DateIf>((set) => ({
    date: new Date(),
    setDate: (d) => {
        set({ date: d })
    }
}))