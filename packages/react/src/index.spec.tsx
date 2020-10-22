import * as React from "react";
import { render, fireEvent, screen } from "@testing-library/react";

import { OrbaOneExample } from "../test/OrbaOneExample";
import { UseOrbaOneExample } from "../test/useOrbaOneExample";

describe("useOrbaOne Test Case", () => {
    it("it should render button", () => {
        render(<UseOrbaOneExample />, { baseElement: document.body });

        expect(screen.getByText("Verify Me"));
    });

    it("should display iframe", async () => {
        render(<UseOrbaOneExample />, { baseElement: document.body });
        fireEvent.click(screen.getByText("Verify Me"));

        expect(screen.findByTestId("orba-iframe"));

        // await waitForElementToBeRemoved(() => screen.getByTestId("loader"));
    });
});

describe("OrbaOne Test Case", () => {
    it("it should render button", async () => {
        render(<OrbaOneExample />, { baseElement: document.body });

        expect(screen.findByText("Verify Me"));
    });

    it("should display iframe", async () => {
        render(<OrbaOneExample />, { baseElement: document.body });
        fireEvent.click(await screen.findByText("Verify Me"));

        expect(screen.findByTestId("orba-iframe"));
    });
});
