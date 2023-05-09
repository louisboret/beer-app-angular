export interface Gem {
    source: string;
    class: string;
    isNew: boolean;
    column: number;
    index: number;
    collectionIndex: number;
    animationPlayed: boolean;
    fallOne?: boolean;
    fallTwo?: boolean;
}