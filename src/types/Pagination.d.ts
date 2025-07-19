export interface PaginationProps{
    pageInfo?: {
        currentPage: number;
        totalGame: number;
        pageSize: number;
    };
    setPageInfo?: React.Dispatch<React.SetStateAction<PaginationProps['pageInfo']>>;
}