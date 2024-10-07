const numberFormatter = () => {
    const mapKMB = [
        { suffix: ' T', threshold: 1e12 },
        { suffix: ' B', threshold: 1e9 },
        { suffix: ' M', threshold: 1e6 },
        { suffix: ' K', threshold: 1e3 },
        { suffix: ' ', threshold: 1 },
    ];

    function formatKMB(number = 0, precision = 1) {
        const found = mapKMB.find((x) => Math.abs(number) >= x.threshold);

        if (found) {
            const formatted = (number / found.threshold).toFixed(precision) + found.suffix;
            return formatted;
        }

        return number.toFixed();
    }

    const mapKMB_KOR = [
        { suffix: '억', threshold: 1e8 },
        { suffix: '만', threshold: 1e4 },
        { suffix: '천', threshold: 1e3 },
    ];

    function formatKMB_KOR(number = 0, precision = 1) {
        const found = mapKMB_KOR.find((x) => Math.abs(number) >= x.threshold);

        if (found) {
            const formatted = (number / found.threshold).toFixed(precision) + found.suffix;
            return formatted;
        }
        else{
            return number.toFixed();
        }
    }

    return { formatKMB, formatKMB_KOR };
};

export default numberFormatter;
