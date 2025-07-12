export interface MiniSliderProps {
    data: {
        Id: number;
        gameName: string;
        categoryName: string;
        platformName: string;
        gameDescription: string;
        gameDiscount: number;
        gamePrice: number;
        discount: number;
        gameImage: string;
        totalSales: number;
        createdOn: string;
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