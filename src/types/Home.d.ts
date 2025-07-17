export interface FilterHomeProps {
    
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
