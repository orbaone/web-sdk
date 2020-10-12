import { ButtonState } from "../helpers/types";
import { isDomElement } from "../helpers/utils";
import { buttonStyles } from "../styles/styles";
import { loader, logo } from "../styles/templates";
import { orbaOneLoaderId } from "../helpers/defaultConfig";

function getButtonTemplate() {
    return `
        <div style="display:flex; align-items: center;height: 100%;" >
            <div style="display: flex;width: 20%;flex-direction: column; align-items: center; padding: 0.5rem 1rem 0 1rem;">
                ${logo}
                <p style="font-size:8px; color: #718096; white-space: nowrap;">By Orba One</p>
            </div>
            <div id="${orbaOneLoaderId}" style="border-left: 1px solid #edf2f7; margin-top: 10px; margin-bottom: 10px; width:80%; display: flex; align-items:center; justify-items: center;padding: 0.5rem 1rem 0.5rem 1rem;">
                ${setButtonText("Verify Me")}
            </div>
        </div>
    `;
}

export function setButtonText(text: string) {
    return `
        <div style="width: 100%; text-align:center;">
            <p style="font-weight: 600; margin:0 auto; color: #4a5568;">${text}</p>
        </div>
    `;
}

export function createButtonState(orbaOneloader: HTMLElement) {
    if (!orbaOneloader) {
        throw new Error("No loader found!");
    }
    return {
        loading() {
            orbaOneloader.innerHTML = loader;
        },
        idle() {
            orbaOneloader.innerHTML = setButtonText("Verify Me");
        },
        success() {
            orbaOneloader.innerHTML = setButtonText("Complete");
        },
        error() {
            orbaOneloader.innerHTML = setButtonText("Could Not Start Verification");
        },
    };
}

export function applyDefaultButtonStyle(buttonElement: HTMLElement) {
    buttonElement.setAttribute("style", buttonStyles);
    buttonElement.classList.add("orba-verify-button");
    buttonElement.innerHTML = getButtonTemplate();
    return buttonElement;
}

export function createButton(
    target: string | HTMLElement | Element,
    disableStyle = false,
    onChange?: (status: ButtonState) => void,
) {
    const buttonElement = isDomElement(target)
        ? (target as HTMLElement)
        : (document.querySelector(target) as HTMLElement);

    if (!buttonElement) {
        throw `Target Element ${buttonElement} not found`;
    }

    const button = disableStyle ? buttonElement : applyDefaultButtonStyle(buttonElement);
    const buttonState = disableStyle
        ? {}
        : createButtonState(button.querySelector(`#${orbaOneLoaderId}`) as HTMLElement);

    return {
        el: button,

        setState: (state: ButtonState) => {
            if (!disableStyle) {
                if (buttonState[state]) {
                    buttonState[state]();
                    if (onChange) {
                        onChange(state);
                    }
                }
            }
        },
    };
}
