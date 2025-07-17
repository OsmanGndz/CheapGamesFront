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

export interface FilterProps {
    filters: {
        name: string;
        icon: React.ReactNode;
        endpoint: string;
    }[];
    filter:{
        name: string;
        icon: React.ReactNode;
        endpoint: string;
    };
    setFilter: React.Dispatch<React.SetStateAction<FilterProps["filter"]>>;
}