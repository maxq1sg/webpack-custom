import PubSub, { Callback, Listener } from './PubSub';
import { BaseRecord, DataBase, Pokemon } from './types';
// import ReactDOM from "react-dom";
// import React from "react";
// import Wrapper from "./components/Wrapper";

// ReactDOM.render(<Wrapper />, document.getElementById("root"));

interface AfterAddArg<T>{
    newValue:T
}
interface IFound<T>{
    max:number,
    found:T|undefined
}
type IGetMaxCallback<T>=(record:T)=>number

function databaseCreator<T extends BaseRecord>(){
    return class PokemonsDatabase implements DataBase<T>{
        data:Record<string,T>={}
        //запрет на создание инстансов вне класса для синглтона

        private constructor(){} 
        private static instance:PokemonsDatabase
        private afterAddListeners:PubSub<AfterAddArg<T>>=new PubSub<AfterAddArg<T>>()
        static createInstance(){
            if(PokemonsDatabase.instance){
                return PokemonsDatabase.instance
            }
            PokemonsDatabase.instance=new PokemonsDatabase()
            return PokemonsDatabase.instance
        }
        get(id:string){
            return this.data[id]
        }
        set(newValue:T){
            this.data[newValue.id]=newValue
            this.afterAddListeners.publish({newValue})
        }
        all(){
            return this.data
        }
        onAfterSet(clb:Callback){
            this.afterAddListeners.subscribe(clb)
        }
        getMax(strategy:IGetMaxCallback<T>){
            const found:IFound<T>={
                max:0,
                found:undefined
            }
            Object.values(this.data).reduce((f,item)=>{
                const currentValue = strategy(item)
                if(currentValue>f.max){
                    found.max=currentValue
                    found.found=item
                }
                return f
            },found)
            return found
        }
    }
}

const Factory = databaseCreator<Pokemon>()
const db = Factory.createInstance()
db.onAfterSet(({newValue})=>{
    console.log(newValue)
})
db.set({id:"2",defense:132,attack:23})
db.set({id:"234",defense:45,attack:93})
const maxDefense  = db.getMax(({defense})=>defense)
console.log(maxDefense)
