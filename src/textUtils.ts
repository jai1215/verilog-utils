
export function removeNewline(str: string) : string {
    //remove all comments
    str = str.replace(/\/\/.*/g, '');
    //remove all newline
    str = str.replace(/\n/g, ' ');
    str = str.replace(/\r/g, ' ');
    str = str.replace(/\s+/g, ' ');
    return str;
}
