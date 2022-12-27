export default class AttributeList {

    private readonly attributes:Attributes = {};

    constructor(attr:Attributes) {
        for (const key in attr) this.set(key, attr[key]);
    }
    
    /**
     * Adds an attribute to this AttributeList.
     * @param name name of attribute
     * @param val value of attribute
     * @returns true if attribute was not present before, false otherwise
     */
    set(name:string, val:string):boolean {
        let out = this.attributes[name] === undefined;
        this.attributes[name] = val;

        return out;
    }

    /**
     * Removes an attribute from this AttributeList.
     * @param name name of attribute
     * @returns the previous value of the attribute
     */
    remove(name:string):string {
        let out = this.attributes[name];
        delete this.attributes[name];

        return out;
    }

    /**
     * Turns this AttributeList into a string representation.
     * @note result is formatted as HTML attribute key-value pairs. (e.g. `type="text" value="Hello World!"`)
     * @returns string representation
     */
    toString():string {
        let out:Array<String> = [];

        for (let name in this.attributes) {
            out.push(`${name}="${this.attributes[name]}"`);
        }

        return out.join(' ');
    }

}

export interface Attributes {
    [key: string]: string
};