export class CreateProjectDto {
    /**
     * Name of the project
     * @example "TFO tour"
     */
    projectName: string;

    /**
     * Description of the Project
     * @example "Cool tfo tour"
     */
    description: string;

    /**
     * Main map of the project as a blob
     * @example "image/png;base64;alkdjfalk..."
     */
    mapBlob: string;
}
