export const clearAllTimeouts = () => {
    const highestTimeout = setTimeout(() => { });
    for (let i = 0; i < highestTimeout; i++) {
        clearTimeout(i);
    }
};