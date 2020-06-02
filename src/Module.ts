import * as tu from './textUtils';

let reserved: string[] = ['input', 'output', 'signed', 'reg', 'wire'];

export class IO{
    prop: string []= [];
    name: string = '';
    bits: string = '';
    value: string = '';

    constructor(str: string){
        this.buildIO(str);
    }
    
    buildIO(str:string){
        let match:string[]|null;
        match = str.match(/parameter/);
        if (match !== null){ //parameter
            str = str.replace(/^\s+/, '');
            let items  = str.split(/\s+/);
            this.name  = items[1];
            this.value = items[3];
            return;
        }
        else{//signal
            str = this.buildBW(str);
            str = this.removeReseved(str);
            str = str.replace(/^\s+/g, '');
            this.name = str;
            return;
        }
    }

    buildBW(str:string){
        let match:string[]|null = str.match(/.*\[(.*)\].*/);
        if (match === null){
            this.bits = '1';
            return str;
        }
        else{
            str = str.replace(/\[.*\]/, '');
            let bw = match[1].split(':');
            this.bits = bw[0];
            return str;
        }
    }

    removeReseved(str:string){
        for(let i=0;i<reserved.length;i++){
            let re = new RegExp(reserved[i]);
            let match:string[]|null = str.match(re);
            if (match !== null){
                this.prop.push(reserved[i]);
                str = str.replace(re, '');
            }
        }
        return str;

    }

    parseBW(str:string){
        let bw:string[] = str.split(':');
        return Number(bw[0]);
    }

    dumpPort(len:number, comma:Boolean = true){
        let str:string;
        let name = tu.strStretch(len, this.name);
        
        str = "    ."+name+" ( "+name+" )";
        if(comma === true){
            str = str + ",";
        }
        str = str + "\n";
        return str;
    }

    print(){
        console.log("Name : %s / IO : %s / length : %d\n", this.name, this.prop, this.bits);
    }
};

export class Module {
    
    text: string = '';
    module:string = '';
    param_array:IO[] = new Array<IO>();
    ports_array:IO[] = new Array<IO>();

    constructor(text: string){
        this.text = text;
    }

    buildStructure(){
        this.module = this.getModule(this.text);
        this.getParam(this.text);
        this.getPorts(this.text);
    }

    getPorts(text:string){
        let match:string[]|null = text.match(/.*\((.*)\)/);
        if (match === null){
            console.log("Fail to find ports list");
            return;
        }
        let ports = match[1].split(',');
        for(let i=0;i<ports.length;i++){
            this.ports_array.push(new IO(ports[i]));
            // ports_array[i].print();
        }
    }

    getParam(text:string){
        let match:string[]|null = text.match(/\s*#\s*\((.*)\).*\(/);
        if (match === null){
            return ;
        }
        else{
            this.text = this.text.replace(/\s*#\s*\(.*?\)/, '');
            let ports = match[1].split(',');
            for(let i=0;i<ports.length;i++){
                this.param_array.push(new IO(ports[i]));
            }
        }
    }
    
    getModule(text: string){
        let match:string[]|null = text.match(/\s*module\s+(\w+)/);
        if (match === null){
            return 'Can not find module';
        }else{
            this.text = this.text.replace(/\s*module\s+(\w+)/, '');
            return match[1];
        }
    }

    dumpInst(){
        let module = this.module;
        let ports = this.ports_array;
        let str:string = module + " u_"+module+"(\n";
        let l = ports.length;
        let max_len:number = 0;
        for(let i=0;i<(l-1);i++){
            let pl = ports[i].name.length;
            if(max_len<pl){
                max_len = pl;
            }
        }
        for(let i=0;i<(l-1);i++){
            str += ports[i].dumpPort(max_len);
        }
        str += ports[l-1].dumpPort(max_len, false);
        str += ');\n';
        return str;
    }
};