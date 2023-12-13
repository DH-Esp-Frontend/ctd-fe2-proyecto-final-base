// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';

import { server } from "./features/quote/mocks/server";
// antes de todas las pruebas el servidor escucha
beforeAll(() => server.listen()); 

afterEach(() => server.resetHandlers()); 

// Clean up after the tests are finished.
afterAll(() => server.close());
