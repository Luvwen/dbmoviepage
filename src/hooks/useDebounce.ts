export const useDebounce = (callback: (arg: any) => void, timeout: number) => {
    let timer: number | NodeJS.Timeout | undefined = undefined;

    return (arg: any) => {
        clearTimeout(timer);
        timer = setTimeout(() => callback(arg), timeout);
    };
};
