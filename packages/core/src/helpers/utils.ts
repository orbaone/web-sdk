import { buttonStyles, iframeStyles } from "../styles/styles";
import { logo, loader } from "../styles/svg";
import { OrbaOneConfig } from "./types";

export function isDomElement(obj: any): obj is HTMLElement | Element {
    //! check if obj is not null explicitly because null is a type of object
    return !!(obj !== null && typeof obj === "object" && obj.nodeType !== undefined);
}

export function isValidConfig(requiredProps: Array<keyof Omit<OrbaOneConfig, "disableStyle">>, config: any) {
    if (!config) {
        throw "Configuration object not found, please see https://docs.orbaone.com";
    }
    const validationSchema = {
        target: (val: any) => {
            if (typeof val !== "string" && !isDomElement(val)) {
                throw `Target Element ${val} must be of type string or DOM Element, please see https://docs.orbaone.com`;
            }
        },
        apiKey: (val: any) => {
            if (typeof val !== "string") {
                throw `Api key required, please see https://docs.orbaone.com`;
            }
        },
        onSuccess: (val: any) => {
            if (typeof val !== "function") {
                throw `onSuccess must be a function, please see https://docs.orbaone.com`;
            }
        },
        onError: (val: any) => {
            if (typeof val !== "function") {
                throw `onError must be a function, please see https://docs.orbaone.com`;
            }
        },
        steps: (val: any) => {
            if (!Array.isArray(val)) {
                throw `Verification steps field missing, please see https://docs.orbaone.com`;
            }
        },
    };
    requiredProps.forEach((prop) => {
        validationSchema[prop](config[prop]);
    });

    return true;
}

function getButtonTemplate() {
    return `
 <div style="display:flex; align-items: center;height: 100%;" >
     <div style="display: flex;width: 20%;flex-direction: column; align-items: center; padding: 0.5rem 1rem 0 1rem;">
         ${logo}
         <p style="font-size:8px; color: #718096; white-space: nowrap;">By Orba One</p>
     </div>
     <div id="orba-one-loader" style="border-left: 1px solid #edf2f7; margin-top: 10px; margin-bottom: 10px; width:80%; display: flex; align-items:center; justify-items: center;padding: 0.5rem 1rem 0.5rem 1rem;">
         <div  style="width: 100%; text-align:center;">
             <p style="font-weight: 600; margin:0 auto; color: #4a5568;">Verify Me</p>
         </div>
     </div>
 </div>
`;
}

export function getButton(target: string | HTMLElement | Element) {
    const buttonElement = isDomElement(target)
        ? (target as HTMLElement)
        : (document.querySelector(target) as HTMLElement);
    return buttonElement;
}

export function applyDefaultButtonStyle(buttonElement: HTMLElement) {
    buttonElement.setAttribute("style", buttonStyles);
    buttonElement.classList.add("orba-verify-button");
    buttonElement.innerHTML = getButtonTemplate();
    return buttonElement;
}

export function createIframe(url: string) {
    const frame = document.createElement("iframe");
    frame.allow = "geolocation; microphone; camera";
    frame.src = url;
    frame.setAttribute("style", iframeStyles);

    //Set Test Id for DOM checking
    frame.dataset.testid = "orba-iframe";
    return frame;
}

export function getSessionUrl(verificationUrl: string, apiKey: string, applicantId: any, steps: string[]) {
    return `${verificationUrl}?publicKey=${apiKey}&applicantId=${applicantId}&steps=${steps.join("&steps=")}`;
}

export function OrbaOne(iframe: HTMLIFrameElement, onSuccess: Function, onError: Function) {
    let state: "loading" | "success" | "error" | "idle" = "idle";

    iframe.onload = function () {
        state = "success";
    };

    iframe.onerror = function () {
        state = "error";
    };

    function handler(event: any) {
        const json = JSON.parse(event.data);

        if (json.status === "success") {
            onSuccess(json);
        } else {
            onError(json);
        }
    }

    return {
        connect() {
            if (state === "idle") {
                state = "loading";
                document.body.appendChild(iframe);
                window.addEventListener("message", handler, false);
            }
        },

        disconnect() {
            state = "idle";
            window.removeEventListener("message", handler);
            document.body.removeChild(iframe);
        },
        status() {
            return state;
        },
    };
}

export function getApplicationId(apiUrl: string, apiKey: string) {
    return fetch(`${apiUrl}/applicants/request`, {
        headers: {
            Accept: "application/json",
            "Accept-Enconding": "gzip, deflate, br",
            "Content-Type": "application/json",
            Connection: "keep-alive",
            PublicKey: apiKey,
        },
        method: "POST",
        body: JSON.stringify({
            publicKey: apiKey,
        }),
    });
}

export function createLoader(orbaOneLoaderId: string) {
    const orbaOneloader = document.querySelector(orbaOneLoaderId) as HTMLElement;
    return {
        show() {
            orbaOneloader.innerHTML = loader;
        },
        hide() {
            orbaOneloader.innerHTML = "";
        },
    };
}
