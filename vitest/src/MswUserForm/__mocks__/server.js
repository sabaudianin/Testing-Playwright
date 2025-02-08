import { setupServer } from "msw/node";
import { handlers } from "../handlers/setupHandler";

const serverHandlers = [...handlers];

export const server = setupServer(...serverHandlers);
