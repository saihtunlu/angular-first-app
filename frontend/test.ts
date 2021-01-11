class ParentClass {
    j:number;
    constructor(k:number) {
        this.j=k;
    }
}
class ChildClass extends ParentClass {
    e:string;
    constructor(d:string,k:number) {
        super(k);
        this.e=d
    }
    value(){
        return "Parent Class is "+this.j+"/n"+"Child Class is "+this.e;
    }
}
let MyObj=new ChildClass("Hay",23)
console.log(MyObj.value())