export class CreatePageDto {
    /**
     * Project id of the project this page is part of
     * @example "923u54on"
     */
    projectId: string;

    /**
     * Name of the page, is unique
     * @example "sn_labor"
     */
    name: string;

    /**
     * Display name of the page
     * @example "Sn Labor"
     */
    displayName: string;

    /**
     * Map x coodinate of the page
     * @example "50"
     */
    mapX: number;

    /**
     * Map y coodinate of the page
     * @example "30"
     */
    mapY: number;
}
