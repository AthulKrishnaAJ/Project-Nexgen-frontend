const prepareDataForPostApi = (values: any, excludeKey: string[]): any => {

    if(excludeKey.length === 0){
        return Object.fromEntries(
            Object.entries(values).map(([key, value]) => [key, typeof value === 'string' ? value.trim() : value])
        )
    }

    return Object.fromEntries(
        Object.entries(values)
        .filter(([key]) => !excludeKey.includes(key))
        .map(([key, value]) => [key, typeof value === 'string' ? value.trim() : value])
    )
}

export default prepareDataForPostApi