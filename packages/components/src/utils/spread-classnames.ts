export default function spreadClassNames(
    classesArray: Array<string | boolean>
): string {
    return classesArray.filter(Boolean).join(' ');
}
