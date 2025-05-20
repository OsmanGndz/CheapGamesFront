export interface MiniSliderProps {
    data: {
        title: string;
        imageUrl: string;
        filter: string;
        price: number;
        discount: number;
        category: string;
        totalSales: number;
    }[];
    filters: {
        name: string;
        icon: React.ReactNode;
    }[];
}

export interface FilterProps {
    filters: {
        name: string;
        icon: React.ReactNode;
    }[];
    filter: string;
    setFilter: React.Dispatch<React.SetStateAction<string>>;
}