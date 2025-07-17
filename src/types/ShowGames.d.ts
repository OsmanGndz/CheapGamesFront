export interface ShowGamesProps {
    filters?: string[];
    colNumber?: number;  
    isPagination?: boolean;
}

export interface FilterGameProps {
    filters: string[];
    filter: string;
    setFilter: React.Dispatch<React.SetStateAction<string>>;
}