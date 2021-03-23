import { iframeStyles } from "../styles/styles";

import { ORBA_ONE_MESSAGE_CHANNEL, ORBA_ONE_SUCCESS, ORBA_ONE_CANCEL } from "./constants";

type State = "loading" | "success" | "error" | "idle";

export function createIframe(
    url: string,
    applicantId: string,
    onSuccess: (...args) => void,
    onCancelled: (...args) => void,
    onError: (...args) => void,
    onChange: (state: State) => void,
) {
    const frame = document.createElement("iframe");
    frame.allow = "geolocation; microphone; camera; fullscreen;";
    frame.src = url;
    frame.setAttribute("style", iframeStyles);

    //Set Test Id for DOM checking
    frame.dataset.testid = "orba-iframe";
    return iframeManager(frame, applicantId, onSuccess, onCancelled, onError, onChange);
}

export function iframeManager(
    iframe: HTMLIFrameElement,
    applicantId,
    onSuccess: (...args) => void,
    onCancelled: (...args) => void,
    onError: (...args) => void,
    onChange: (state: State) => void,
) {
    let state: State = "idle";
    const background: HTMLElement = document.getElementById("app")!;


    iframe.onload = function () {
        state = "success";
        onChange(state);
    };

    iframe.onerror = function (err) {
        state = "error";
        onChange(state);
        onError(err);
    };

    function disconnect() {
        state = "idle";
        onChange(state);
        if (iframe) {
            window.removeEventListener(ORBA_ONE_MESSAGE_CHANNEL, handler);
            removeIFrame();
        }
    }

    function removeIFrame() {
        document.body.removeChild(iframe); 
        background.style.overflow = "auto";
        background.style.height = "auto";
    }

    function addIFrame() {
        background.style.overflow = "hidden";
        const innerHeight = window.innerHeight.toString() + "px";
        background.style.height = innerHeight;
        iframe.style.height = innerHeight;
        background.style.marginTop = "0";
        document.body.appendChild(iframe);
    }

    function handler(event: any) {
        if (event.data === ORBA_ONE_SUCCESS) {
            onSuccess({ applicantId, status: "success" });
            disconnect();
        } else if (event.data === ORBA_ONE_CANCEL) {
            onCancelled({ applicantId, status: "cancelled" });
            disconnect();
        } else {
            onError({ applicantId, status: "error" });
        }
    }

    return {
        el: iframe,
        connect() {
            if (!iframe) {
                throw `No iframe found. Please attach iframe before trying to connect`;
            }
            if (state === "idle") {
                state = "loading";
                onChange(state);
                addIFrame();
                window.addEventListener(ORBA_ONE_MESSAGE_CHANNEL, handler);
            }
        },

        disconnect,
        status() {
            return state;
        },
    };
}
