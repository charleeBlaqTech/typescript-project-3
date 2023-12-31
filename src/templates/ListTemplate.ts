import FullList from "../model/FullList";

interface DOMList{
    ul: HTMLUListElement,
    clear(): void,
    render(fulllList: FullList): void
}


export default class ListTemplate implements DOMList{
    ul: HTMLUListElement;

    static instance:ListTemplate = new ListTemplate();

    private constructor(){
        this.ul = document.getElementById('listItems') as HTMLUListElement
    }

    clear(): void {
        this.ul.innerHTML= ""
    }

    render(fulllList: FullList): void {
        this.clear();

        fulllList.list.forEach(item=>{
                const li = document.createElement('li') as HTMLElement;
                li.className= "item";

                const check = document.createElement('input') as HTMLInputElement;
                check.type = "checkbox";
                check.id = item.id;
                check.checked = item.checked;
                

                check.addEventListener('change', ()=>{
                    item.checked = !item.checked;
                    item.checked === true? label.style.textDecoration= "line-through": label.style.textDecoration= "none";
                    
                    fulllList.save();
                })

                const label = document.createElement('label') as HTMLLabelElement;
                label.htmlFor = item.id;
                label.textContent = item.item;

               

                const button = document.createElement('button') as HTMLButtonElement;
                button.className = 'button';
                button.textContent= "X";
                button.addEventListener('click', ()=>{
                    fulllList.removeItem(item.id);
                    this.render(fulllList);
                })

                li.append(check, label, button);
                this.ul.append(li);

        })
    }
}