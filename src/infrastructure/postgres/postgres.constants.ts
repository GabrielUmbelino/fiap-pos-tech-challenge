export class DatabaseConstants {
  //Database
  public static readonly DATABASE_CONFIG_NAME = 'DATABASE_CONFIG';
  public static readonly DATABASE_TYPE = 'postgres';
  public static readonly DATABASE_DRIVER = 'postgres';
  public static readonly DATABASE_ENTITIES = [
    'src/infrastructure/repositories/**/*.entity.{ts,js}',
  ];
  public static readonly DATABASE_SYNCHRONIZE = true;
  public static readonly DATABASE_LOGGING = true;
  public static readonly DATABASE_AUTO_LOAD_ENTITIES = true;
}
