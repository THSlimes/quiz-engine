import CSSLength from '../CSSLength';
import UIComponent from './UIComponent';

export default interface TextUIComponent extends UIComponent {
    fontSize?:CSSLength,
    color?:string,
    font?:Font
}

interface Font {
    typeface:string
}