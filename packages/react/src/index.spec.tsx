import * as React from "react";
import { render, fireEvent, act, cleanup } from "@testing-library/react";

import { OrbaOneExample } from "../test/OrbaOneExample";
import { UseOrbaOneExample } from "../test/useOrbaOneExample";

describe("useOrbaOne Test Case", function () {
    afterEach(cleanup);
    it("it should render button", () => {
        const { getByText } = render(<UseOrbaOneExample />);

        expect(getByText("Verify Me"));
    });

    it("should display iframe", async () => {
        const { getByText, getByTestId } = render(<UseOrbaOneExample />);
        act(() => {
            fireEvent.click(getByText("Verify Me"));
        });

        expect(getByTestId("orba-iframe"));
    });
});

describe("OrbaOne Test Case", function () {
    afterEach(cleanup);
    it("it should render button", () => {
        const { getByText } = render(<OrbaOneExample />);

        expect(getByText("Verify Me"));
    });

    it("should display iframe", async () => {
        const { getByText, getByTestId } = render(<OrbaOneExample />);
        act(() => {
            fireEvent.click(getByText("Verify Me"));
        });

        expect(getByTestId("orba-iframe"));
    });
});
