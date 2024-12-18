export const clearAllTimeouts = () => {
    const highestTimeout = setTimeout("fakeTimout");
    for (let i = 0; i < highestTimeout; i++) {
        clearTimeout(i);
    }
};