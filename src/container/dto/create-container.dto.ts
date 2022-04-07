export class CreateContainerDto {
    /**
     * Page_id of the page where the container is on
     * @example "ajsknkfd7sdf"
     */
    pageId: string;

    /**
     * Name of the container (Attention! doesn't have to be unique)
     * @example "logo_1"
     */
    name: string;

    /**
     * x coordinate of the container
     * @example "39"
     */
    xCoordinate: number;

    /**
     * y coordinate of the container
     * @example "29"
     */
    yCoordinate: number;

    /**
     * width of the container
     * @example "29"
     */
    width: number;

    /**
     * height of the container
     * @example "29"
     */
    height: number;

    /**
     * Id of the resource the container contains
     * @example "aisjdf8sud"
     */
    resourceId: string;
}
