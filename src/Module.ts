import * as tu from './textUtils';

export class IO{
    io: string = '';
    name: string = '';
    bits: number = 0;

    constructor(str: string){
        this.buildIO(str);
    }
    
    buildIO(str:string){
        let match:string[]|null = str.match(/\s*(\w+)\s+(\w+)/);
        if (match !== null){
            this.io = match[1];
            this.name = match[2];
            this.bits = 1;
            return;
        }
        match = str.match(/\s*(\w+)\s+\[(.*)\]\s+(\w+)/);
        if (match !== null){
            this.io = match[1];
            this.bits = this.parseBW(match[2]);
            this.name = match[3];
            return;
        }
        console.log("Fail to find ports");
    }

    parseBW(str:string){
        let bw:string[] = str.split(':');
        return Number(bw[0]);
    }

    dumpPort(comma:Boolean = true){
        let str:string;
        let name = this.name;
        if(comma === false){
            str = "    ."+name+" ( "+name+" )\n";
            return str;
        }
        str = "    ."+name+" ( "+name+" ),\n";
        return str;
    }

    print(){
        console.log("Name : %s / IO : %s / length : %d\n", this.name, this.io, this.bits);
    }
};

export class Module {
    
    text: string = '';
    module:string = '';
    ports_array:IO[] = new Array<IO>();

    constructor(text: string){
        this.text = text;
    }

    buildStructure(){
        let text = this.text;
        this.module = this.getModule(text);
        this.getPorts(text);
    }

    getPorts(text:string){
        let match:string[]|null = text.match(/.*\((.*)\)/);
        if (match === null){
            console.log("Fail to find ports");
            console.log(text);
            return ;
        }
        let ports = match[1].split(',');
        for(let i=0;i<ports.length;i++){
            this.ports_array.push(new IO(ports[i]));
            // ports_array[i].print();
        }
        return;
    }
    
    getModule(text: string){
        let match:string[]|null = text.match(/module\s+(\w+)/);
        if (match === null){
            return '';
        }else{
            return match[1];
        }
    }

    dumpInst(){
        let module = this.module;
        let ports = this.ports_array;
        let str:string = module + " (\n";
        let l = ports.length;
        for(let i=0;i<(l-1);i++){
            str += ports[i].dumpPort();
        }
        str += ports[l-1].dumpPort(false);
        str += ');\n';
        return str;
    }
};