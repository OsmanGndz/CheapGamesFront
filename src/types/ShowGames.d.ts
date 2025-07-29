export interface ShowGamesProps {
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
    pageInfo?: {
        currentPage: number;
        totalGame: number;
        pageSize: number;
    };
    setPageInfo?: React.Dispatch<React.SetStateAction<ShowGamesProps['pageInfo']>>;
    isFavoriteMode?: boolean;
    onRemoveFromFavorites?: (gameId: number) => void;
}

export interface FilterGameProps {
    filters?: string[];
    filter?: string;
    setFilter?: React.Dispatch<React.SetStateAction<string>>;
}