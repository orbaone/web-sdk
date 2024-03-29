export interface OrbaOneConfig {
    target: string | Element | HTMLElement;
    apiKey: string;
    applicantId?: string;
    companyId?: string;
    disableStyle?: boolean;
    useAudioInstructions?: boolean;
    environment?: string;
    onSuccess: (result: any) => void;
    onError: (result: any) => void;
    onCancelled: (result: string) => void;
    onChange?: (result: string) => void;
    steps: string[];
}

export interface SessionConfig {
    verificationUrl: string;
    apiKey: string;
    steps: string[];
    companyId?: string;
    applicantId?: any;
    useAudioInstructions?: boolean;
}

export interface IFrameConfig {
    url: string;
    applicantId?: string;
    companyId?: string;
    useAudioInstructions?: boolean;
    onSuccess: (...args) => void;
    onCancelled: (...args) => void;
    onError: (...args) => void;
    onChange: (state: State) => void;
}

export type State = "loading" | "success" | "error" | "idle";



export type ButtonState = "loading" | "idle" | "success" | "error";
