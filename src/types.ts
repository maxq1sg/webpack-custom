export type ID=number|string
export interface BaseRecord{
    id:string|number
}
export interface Pokemon extends BaseRecord{
    defense:number,
    attack:number
}

export interface DataBase<T extends BaseRecord>{
    data:Record<string,T>,
    get(id:string):T,
    set(newValue:T):void
}
