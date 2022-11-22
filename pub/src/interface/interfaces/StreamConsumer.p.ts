
export type IStreamConsumer<PData> = {
    readonly "onData": ($: PData) => void
    readonly "onEnd": () => void
};

