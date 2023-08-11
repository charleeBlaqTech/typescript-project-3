import FullList from "../model/FullList";

interface DOMList{
    ul: HTMLUListElement,
    clear(): void,
    render(fulllList: FullList): void
}