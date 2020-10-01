import * as React from "react";
import { render, fireEvent, act } from "@testing-library/react";

import fetchMock from "jest-fetch-mock";
import { UseOrbaOneExample } from "./helpers/useOrbaOneExample";

beforeEach(() => {
    fetchMock.resetMocks();
    render(<UseOrbaOneExample />).unmount();
});

describe("useVerify test case", function () {
    it("it should render button", () => {
        const { getByText } = render(<UseOrbaOneExample />);

        expect(getByText("Verify Me"));
    });

    it("should display state error", async () => {
        const { getByText, findByText } = render(<UseOrbaOneExample />);
        fetchMock.mockReject(new Error("0"));
        act(() => {
            fireEvent.click(getByText("Verify Me"));
        });

        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(await findByText(/error/i));
    });

    it("should display state success", async () => {
        const { getByText, findByText } = render(<UseOrbaOneExample />);
        fetchMock.mockResponse(
            () =>
                new Promise((reslove) => {
                    reslove({ body: "1" });
                }),
        );
        act(() => {
            fireEvent.click(getByText("Verify Me"));
        });

        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(await findByText(/success/i));
    });
});
