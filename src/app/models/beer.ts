export interface Beer {
    id?: string;
    name: string;
    alcoholPercentage: number;
    image: string;
    breweryId: string;
    breweryName: string;
    isFavorite?: boolean;
}