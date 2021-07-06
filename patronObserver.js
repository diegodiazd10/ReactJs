//Creamos la clase padre que tendra los metodos y atributos a heredar
class Observable {
  //creamos un array dentro del constructor que va a guardar los suscriptores
  constructor() {
    this.observers = [];
  }
  //creamos la funcion que añade los sucriptores al array
  subscribe(notifyingClass) {
    this.observers.push(notifyingClass);
  }
  //creamos la funcion que elimina a los suscriptores del array
  unsubscribe(notifyingClass) {
    this.observers = this.observers.filter(
      (observer) => observer instanceof notifyingClass !== true
    );
  }
  //creamos una funcion que informa con un mensaje a cada uno de los sucriptores acerca de algun cambio
  notifyObservable(mensaje) {
    this.observers.forEach((observer) => {
      observer.notify(mensaje);
    });
  }
}
//creamos una clase hija que hereda y tiene un atributo value inicializado en 0 con un metodo increment
class NumberExample extends Observable {
  constructor() {
    super();
    this.value = 0;
  }

  increment() {
    this.value++;
    this.notifyObservable(this);
  }
}
//creamos las clases suscriptoras que van a estar al pendiente de los cambios en la clase hija
class NumberExampleSpanish {
  notify(mensaje) {
    console.log(`El nuevo numero es: ${mensaje.value}`);
  }
}

class NumberExampleEnglish {
  notify(mensaje) {
    console.log(`The new Number is: ${mensaje.value}`);
  }
}

let numberExample = new NumberExample();

numberExample.subscribe(new NumberExampleSpanish());
numberExample.subscribe(new NumberExampleEnglish());

numberExample.increment();
numberExample.increment();

numberExample.unsubscribe(new NumberExampleEnglish());

numberExample.increment();
numberExample.increment();

console.log(numberExample.observers);
