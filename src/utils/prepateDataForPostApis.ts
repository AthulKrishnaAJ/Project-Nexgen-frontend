const prepareDataForPostApi = (values: any, excludeKey: string[]): any => {
    const trimmedData: any = {};

    for (const key in values) {
        if (excludeKey.includes(key)) {
            trimmedData[key] = values[key]; 
        } else if (Array.isArray(values[key])) {
            trimmedData[key] = values[key].map((item: string) => item.trim()).filter((item: string) => item !== "");
        } else if (typeof values[key] === "string") {
            trimmedData[key] = values[key].trim();
        } else {
            trimmedData[key] = values[key];
        }
    }

    return trimmedData;
};

export default prepareDataForPostApi