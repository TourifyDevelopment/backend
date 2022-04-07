export class CreateUserDto {
    /**
   * Unique username
   * @example "user01"
   */
    username: string;

    /**
   * Password for the user
   * @example "asdf"
   */
    password: string;

    /**
   * Profile picture of the user
   * Profile picture is supplied as a base64 string
   * @example "image/png;base64;alkdjfalk..."
   */
    profilePicture: string;
}
