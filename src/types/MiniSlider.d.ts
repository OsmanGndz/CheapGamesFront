export interface MiniSliderProps {
    filters?: {
        name: string;
        icon: React.ReactNode;
        endpoint: string;
    }[];
}

export interface FilterProps {
    filters: {
        name: string;
        icon: React.ReactNode;
        endpoint: string;
    }[];
    data: {
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
    filter:{
        name: string;
        icon: React.ReactNode;
        endpoint: string;
    };
    setIsLoading: React.Dispatch<React.StateAction<boolean>>;
    setError: React.Dispatch<React.StateAction<string>>;
    setFilter: React.Dispatch<React.SetStateAction<FilterProps["filter"]>>;
    setFilteredData: React.Dispatch<React.SetStateAction<FilterProps["data"]>>;
}