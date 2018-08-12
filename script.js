class Component 
{


     notify() {
        this.callback();
    }

    register(callback) {
        this.callback = callback;
    }

    render() {}
}




class Renderer
{
    constructor(component, destination) {
        this.render = component.render.bind(component);
        this.destination = destination;

        component.register(() => {
            return this.listen();
        });

        this.listen();
    }

    listen () {
        this.destination.innerHTML = '';
        this.destination.appendChild(this.render());
    }
}


class stopWatch extends Component{
  
    constructor(){
        super();
        this.milis =this.pad2(0); 
        this.second =this.pad2(0); 
        this.minute = this.pad2(0);
        this.houre = this.pad2(0);
        this.flag= false;
    }

    start(notify,flag){
        
        this.flag = flag;
        if(!this.flag){
        
        this.flag= true;
        this.interval = setInterval(() =>{
            this.milis++;
    
            if(this.milis==100){
                this.milis=0;
                this.second++;
                if(this.second==60){
                    this.second=0;
                    this.minute++;
                    if(this.minute==60){
                        this.minute=0;
                        this.houre++;
                    }

                }
            }

            $('div h1:first').html(`${this.houre} : ${this.minute} : ${this.second} . ${this.milis}`);
        },10);}
        
       this.notify = notify;
       this.notify();
    }

    pad2(number) {
   
        return (number < 10 ? '0' : '') + number
      
   }

    reset(notify, flag){
       this.flag = flag; 
       if(!flag){
        this.milis =this.pad2(0); 
        this.second =this.pad2(0); 
        this.minute = this.pad2(0);
        this.houre = this.pad2(0);
       
       $('div h1:first').html(`${this.houre} : ${this.minute} : ${this.second} . ${this.milis}`);
       }else{
           alert("Please First You should stop the watch!")
       }
       this.notify = notify;
       this.notify();
    }

    stop(notify, flag){
        $('div h1:first').html(`${this.houre} : ${this.minute} : ${this.second} . ${this.milis}`);
        this.flag= flag;
        this.flag= false;
        clearInterval(this.interval);
        this.notify = notify;
        this.notify();
     }





    render(){
    
        return $(`<div>`).append(  [
          $('<h1>').html(`${this.houre} :${this.minute} : ${this.second} . ${this.milis}`), 
          $(`<button>`).html("Start").on('click' , () =>{
            if(!this.flag){
            this.start(this.notify, this.flag ); 
          }}),  
          $(`<button>`).html("Stop").on('click' , () =>{
            if(this.flag){
            this.stop(this.notify, this.flag);
           }}), 
          $(`<button>`).html("Reset").on('click',() => {
                this.reset(this.notify, this.flag);})]
            )[0];
            
    }

    
}


