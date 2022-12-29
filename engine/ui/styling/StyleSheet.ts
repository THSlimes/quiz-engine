import CSSProperty from "./CSSProperty"

export default class StyleSheet {

    private sheet:CSSSheet;

    constructor(sheet:CSSSheet) {
        this.sheet = sheet;
    }

    /**
     * Gives the string representation of this StyleSheet
     * @returns this StyleSheet as a string (formatted as an HTML style element)
     */
    public toString():string {
        let out = ['<style>'];

        for (const sel in this.sheet) {
            const part = [`    ${sel} {`];
            for (const prop in this.sheet[sel]) part.push(`        ${prop}: ${this.sheet[sel][prop as CSSProperty]};`);
            part.push('    }');
            out.push(part.join('\n'));
        }

        out.push('</style>');

        return out.join('\n');
    }

}

interface CSSSheet {
    [key: string]: {
        [key in CSSProperty]?: string|number;
    }
};