const SetFloatingTextInputRefs = (refs) => {
    let timeout;
    timeout = setTimeout(() => {
        // @ts-ignore
        refs.forEach((ref) => {
            ref?.current?.state?.floating = true;
        });
    }, 0);
    return () => {
        clearTimeout(timeout);
    };
};

export { SetFloatingTextInputRefs };
