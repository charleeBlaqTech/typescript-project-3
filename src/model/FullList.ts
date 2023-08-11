import './css/style.css';
import ListItem from './ListItem';

interface List {
    list: ListItem[],
    load(): void,
    save():void,
    clearList(): void,
    addItem(itemObt: ListItem): void,
    removeItem(id: string): void,
    
}

type  Item = {
    _id: string,
    _item: string,
    _checked: boolean
}


export default class FullList implements List{
    static instance: FullList = new FullList();
    constructor(private _list: ListItem[]= []){
        this._list = _list;
    }

    get list(): ListItem[] {
        return this._list;
    }


    load(): void {
        const storedList: string | null = localStorage.getItem('mylist');
        if(storedList === "" || storedList === null){
            return
        }else{

            const parsedData: Item[]= JSON.parse(storedList);
            parsedData.forEach((item)=>{
                const newListItem= new ListItem(item._id,item._item, item._checked)

                FullList.instance.addItem(newListItem);
            })

        }
        
    }

    save():void {
        localStorage.setItem('mylist', JSON.stringify(this._list));
    }

    clearList(): void {
        this._list = [];
        this.save();
    }

    addItem(itemObt: ListItem): void {
        this._list.push(itemObt);
        this.save();
    }

    removeItem(id: string): void {
        this._list = this._list.filter((item)=>{
            return item.id !== id;
        });
        this.save();
    }

   
}