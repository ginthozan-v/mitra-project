
export const createRoute = ({ basePath, params }: { basePath: string, params: { key: string, element: string }[] }) => {
    let newString = basePath;

    params.forEach(({ key, element }) => {
        newString = newString.replace(key, element)
    });

    return newString;
}
