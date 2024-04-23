export { };

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            //Into the space that is process .env
            EMAIL: string;
            PASSWORD: string;
        }
    }
}
