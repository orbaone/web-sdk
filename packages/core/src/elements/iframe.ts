import { iframeStyles } from "../styles/styles";

type State = "loading" | "success" | "error" | "idle";

export function createIframe(
    url: string,
    onSuccess: (...args) => void,
    onCancelled: (...args) => void,
    onError: (...args) => void,
    onChange: (state: State) => void,
) {
    const frame = document.createElement("iframe");
    frame.allow = "geolocation; microphone; camera";
    frame.src = url;
    frame.setAttribute("style", iframeStyles);

    //Set Test Id for DOM checking
    frame.dataset.testid = "orba-iframe";
    return iframeManager(frame, onSuccess, onCancelled, onError, onChange);
}

export function iframeManager(
    iframe: HTMLIFrameElement,
    onSuccess: (...args) => void,
    onCancelled: (...args) => void,
    onError: (...args) => void,
    onChange: (state: State) => void,
) {
    let state: State = "idle";

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
            window.removeEventListener("message", handler);
            document.body.removeChild(iframe);
        }
    }

    function handler(event: any) {
        const json = JSON.parse(event.data);

        if (json.status === "success") {
            onSuccess(json);
            disconnect();
        } else if (json.status === "cancelled") {
            onCancelled(json);
            disconnect();
        } else {
            onError(json);
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
                document.body.appendChild(iframe);
                window.addEventListener("message", handler, false);
            }
        },

        disconnect,
        status() {
            return state;
        },
    };
}
