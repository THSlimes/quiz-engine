import { Attributes } from '../../AttributeList';
import TextStyling from '../../TextStyling';
import InputUIComponent from './InputUIComponent';

export default class NumberInputUIComponent extends InputUIComponent {

    constructor(fieldName:string, min=0, max=100, step=1, initial=min, styling?:TextStyling, classes?:Array<string>, attributes?:Attributes) {
        super(
            'number',
            'ui-number-input',
            fieldName,
            styling,
            classes,
            {
                ...(attributes ?? {}),
                min: min.toString(),
                max: max.toString(),
                step: step.toString(),
                value: initial.toString()
            }
        );
    }

}