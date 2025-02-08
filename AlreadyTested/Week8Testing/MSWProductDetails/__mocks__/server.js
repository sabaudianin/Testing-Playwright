import { setupServer } from "msw/node";
import { productHandlers } from "../handlers/productHandler";

// const handlers = [...productHandlers];

// export const server = setupServer(...handlers);

export const server = setupServer(...productHandlers);
