export interface ShowGamesProps {
    filters?: string[];
    colNumber?: number;  
    isPagination?: boolean;
    filteredData?: {
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
    loading?: boolean;
    error?: any;
}

export interface FilterGameProps {
    filters: string[];
    filter: string;
    setFilter: React.Dispatch<React.SetStateAction<string>>;
}