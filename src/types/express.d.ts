import { User } from "./app.types";

declare global{
    namespace Express{
        export interface Request{
            user?: User
        }
    }
}