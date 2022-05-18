// *--------Basic---------------
let isBool: boolean = true;
let num: number = 42;
let numArr: number[] = [45, 42, 7, 55];

let x: [string, number];
x = ['hello', 42];

// *--------Type---------------
type Id = string | number;
let id: Id = 'Hello';
id = 42;

// *--------Enum---------------
enum Directions {
    Up,
    Down,
    Left,
    Right
}

Directions.Up;      //0
Directions.Down;    //1
Directions.Left;    //2
Directions.Right;   //3

Directions[0]	// "Up"
Directions[1]	// "Down"
Directions[2]	// "Left"
Directions[3]	// "Right"

const enum links {
    youtube = 'https://youtube.com/',
    vk = 'https://vk.com/',
    facebook = 'https://facebook.com/'
}

const arr = [links.vk, links.facebook];

// *--------Function---------------
const createPassword = (name: string, age?: number) => `${name}${age}`;

const error = (msg: string): never => {
    throw new Error(msg);
}

// *--------Object---------------
let user: { name: string, age: number } = {
    name: 'Yauhen',
    age: 30,
};

type Person = {
    name: string,
    age: number,
    nickName?: string,
    getPass?: () => string,
};

let users: Person = {
    name: 'Yauhen',
    age: 30,
    nickName: 'webDev'
};

let admin: Person = {
    name: 'Max',
    age: 20,
    getPass(): string {
        return `${this.name}${this.age}`;
    }
};

// *--------Classes---------------

class User {

    public name: string;       // по умолчанию
    private nickName: string;  // не доступен за пределами класса
    protected age: number;     // доступен только для наследников
    readonly pass: number;     // только для чтения

    constructor(name: string, age: number, nickName: string, pass: number) {
        this.name = name;
        this.age = age;
        this.nickName = nickName;
        this.pass = pass;
    }

}

class Users {

    private age: number = 20;

    constructor(public name: string) { }

    setAge(age: number) {
        this.age = age;
    }

    set myAge(age: number) {
        this.age = age;
    }
}

const yauhen = new Users('Yauhen');

yauhen.setAge(30);	// 30
yauhen.myAge = 31;	// 31

// *--------Interface---------------

interface Pipok {
    name: string,
    age: number,
}

interface Administrator extends Pipok {
    getPass(): string,
}

class Alexey implements Administrator {
    name: string = 'Alexey';
    age: number = 29;

    getPass() {
        return `${this.name}${this.age}`;
    }
}

// *--------Generic---------------

const getter = <T>(data: T): T => data;

getter<number>(10).length; // Property 'length' does not exist on type '10'
getter<string>('test').length;

class UserG<T, K> {

    constructor(public name: T, public age: K) { }

    public getPass(): string {
        return `${this.name}${this.age}`;
    }

}

const alex = new UserG('Alex', '29');	// string, string
const max = new UserG(123, 321);				// number, number
const leo = new UserG('Leo', 22);			// string, number

alex.getPass();     // "Alex29"
max.getPass();        // "123321"
leo.getPass();        // "Leo22"

// *--------Decorators---------------

const enumerable = (value: boolean) => {
    return (
        target: any,
        propertyKey: string | symbol,
        descriptor: PropertyDescriptor
    ) => {
        descriptor.enumerable = value;
    };
}

class Vasiliy {

    constructor(public name: string, public age: number) { }

    @enumerable(false)			// <--- Call decorator factory with argument
    public getPass(): string {
        return `${this.name}${this.age}`;
    }
}
//-----------------------------------------
const first = () => {
    console.log('first() completing');
    return (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
        console.log('first() called');
    };
}

const second = () => {
    console.log('second() completing');
    return (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
        console.log('second() called');
    };
}

class Petro {

    constructor(public name: string, public age: number) {}

    @first()
    @second()
    public getPass(): string {
        return `${this.name}${this.age}`;
    }

}


// Call results:
"first() completing"      // Factory 1
"second() completing"     // Factory 2
"second() called"         // Decorator 2
"first() called"