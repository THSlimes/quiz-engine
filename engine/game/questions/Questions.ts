import Screen from "../../ui/Screen";
import Answer from "./Answer";

export default interface Question {
    hubScreen:Screen,
    playerScreen:Screen,
    eval(answer:Answer):number
}