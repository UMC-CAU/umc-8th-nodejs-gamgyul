namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv{
    PORT: string;
    DB_HOST: string;
    DB_PORT: string;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_NAME: string;
    DEFAULT_USER_ID: string;
    EXPRESS_SESSION_SECRET: string;
    PASSPORT_GOOGLE_CLIENT_ID: string;
    PASSPORT_GOOGLE_CLIENT_SECRET: string;
    PASSPORT_GOOGLE_CALLBACK_URL: string;
  }
}