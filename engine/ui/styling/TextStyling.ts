/**
 * A TextStyling object describes how text should be styled.
 */
export default class TextStyling {
    size?: CSSLength;
    color?: string;
    alignment?: Alignment;
    typeface?: Array<string>;

    constructor(size?:CSSLength, color?:string, alignment?:Alignment, typeface?:Array<string>) {
        this.size = size;
        this.color = color;
        this.alignment = alignment;
        this.typeface = typeface;
    }

    public toString():string {
        let out:Array<string> = [];

        if (this.size !== undefined) out.push(`font-size:${this.size.val}${this.size.unit};`);
        if (this.color !== undefined) out.push(`color:${this.color};`);
        if (this.alignment !== undefined) out.push(`text-align:${this.alignment};`);
        if (this.typeface !== undefined && this.typeface.length != 0) out.push(`font-family:${this.typeface.map(tf=>`"${tf}"`).join(' ')};`);

        return out.join(' ');
    }

}

enum CSSLengthUnit {
    // Absolute units
    'cm', 'mm', 'in', 'px', 'pt', 'pc',

    // Relative units
    'em', 'ex', 'ch', 'rem', 'vw', 'vh', 'vmin', 'vmax', '%'
}

interface CSSLength {
    val: number,
    unit: CSSLength
}

enum Alignment {
    'left', 'right', 'center', 'justify', 'initial', 'inherit'
}