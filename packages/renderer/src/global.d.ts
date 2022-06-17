declare global {
    const KernelNative: KernelNative;
}

export interface KernelNative {
    window: {
        close: () => void;
        minimize: () => void;
        maximize: () => void;
        restore: () => void;
    };
    process: {
        platform: string;
        arch: string;
    };
    app: {
        getVersion: () => string;
    };
}