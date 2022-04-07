import { ResourceType } from '../schema/resource.schema';

export class CreateResourceDto {
    /**
   * Type of the resource
   * @example "Text"
   */
    type: ResourceType;

    /**
   * Blob of the resource file
   * @example "image/png;base64;alkdjfalk..."
   */
    blob: string;

    /**
   * Style of the resource (optional) (can have every attribute)
   * @example {"fontSize": "8", "color": "#983475"}
   */
    style?: Object;
}
