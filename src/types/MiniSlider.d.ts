export interface MiniSliderProps {
    isloading?: boolean;
    error?: string;
    data?: {
        Id?: number;
        gameName: string;
        categoryName: string;
        platformName: string;
        gameDescription: string;
        gameDiscount: number;
        gamePrice: number;
        gameImage: string;
        totalSales: number;
        isStanding: boolean;
        releaseDate: string;
    }[];
}

export type FilterMenuProps<T> = {
    filters: T[];
    filter:T;
    setFilter: React.Dispatch<React.SetStateAction<T>>;
}