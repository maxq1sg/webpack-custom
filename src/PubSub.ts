export type Callback=(evt:any)=>void
export interface Listener{
    callback:Callback,
    id:number
}

export default class PubSub<T>{
    listeners:Listener[]=[]
    publish=(evt:T)=>{
        this.listeners.forEach(listener=>{
            listener.callback(evt)
        })
    }
    subscribe=(listener:Callback)=>{
        console.log(this)
        this.listeners.push({id:this.listeners.length+1,callback:listener})
    }
    unsubscribe=(id:number)=>{
        this.listeners=this.listeners.filter(l=>l.id!==id)
    }
}


