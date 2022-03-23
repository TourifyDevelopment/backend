import { ResourceType } from "../schema/resource.schema";

export class CreateResourceDto {
    /**
     * Type of the resource
     * @example "Text"
     */
    type: ResourceType;

    /**
     * Blob of the resource file
     * @example "10010101001"
     */
    blob: string;
}