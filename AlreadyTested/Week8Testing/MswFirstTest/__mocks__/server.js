import { setupServer } from "msw/node";
import { dataHandlers } from "../api/handlers/data";

const handlers = [...dataHandlers];

export const server = setupServer(...handlers);
