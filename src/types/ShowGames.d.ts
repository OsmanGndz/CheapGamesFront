export interface ShowGamesProps {
    filters?: string[];  
}

export interface FilterGameProps {
    filters: string[];
    filter: string;
    setFilter: React.Dispatch<React.SetStateAction<string>>;
}