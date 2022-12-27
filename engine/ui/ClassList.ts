export default class ClassList {

    private classes:Array<string>;

    /**
     * Creates a new class-list.
     * @param classes classes in the classlist
     */
    constructor(...classes:Array<string>) {
        this.classes = classes;
    }

    public hasClass(className:string):boolean {
        return this.classes.includes(className);
    }

    public add(className:string):boolean {
        if (this.classes.includes(className)) return false;
        this.classes.push(className);
        return true;
    }

    public addAll(classNames:Array<string>):Array<boolean> {
        return classNames.map(cn => this.add(cn));
    }

    public remove(className:string):boolean {
        if (this.hasClass(className)) {
            this.classes = this.classes.filter(c => c !== className);
            return true;
        }
        else return false;
    }

    public removeAll(classNames:Array<string>):Array<boolean> {
        return classNames.map(cn => this.remove(cn));
    }

    public toggle(className:string):boolean {
        if (this.hasClass(className)) {
            this.remove(className);
            return false;
        }
        else {
            this.add(className);
            return true;
        }
    }

    public toggleAll(classNames:Array<string>):Array<boolean> {
        return classNames.map(cn => this.toggle(cn));
    }

    public toString() {
        return this.classes.join(' ');
    }

};