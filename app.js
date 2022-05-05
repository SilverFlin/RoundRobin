class Memoria 
{
  
 
  constructor( bloque,tamaño,proceso,tiempo) 
  {
        this.bloque = bloque;
        this.tamaño = tamaño;
        this.proceso = proceso;
        this.tiempo = tiempo;
    
  }
  
}

class Tarea {
  constructor(numero, tiempo, tamano, estado) 
  {
    this.numero = numero;
    this.tiempo = tiempo;
    this.tamano = tamano;
    this.estado = estado;
  }

  getSEstado = () => {
    switch (this.estado) {
      case 0:
        return "";
      case 1:
        return "En espera";
      case 2:
        return "Asignado";
      case 3:
        return "Terminado";
    }
    return "";
  };
}
class Proceso {

  constructor() {
        this.QUANTUM = 5;
        let memoria= 50000;
        let numBloque = 1;
        let empi=0;
        this.tiempo =  [1,1,4,6,10,2,3,7,2,7,5,8,10,8,3,6,4,8,4,8,5,5,7,6,10];
        this.tamano =  [760,3210,4190,5760,9350,1380,5950,2030,2550,420,3930,8940,6890,9140,220,6580,740,3610,6990,3820,3290,2710,7540,7540,8390];
        this.tarea= [];
        this.memorias= [];
        this.mmemorias= [];
        for(let cont=0; cont<25; cont++){
            tarea[cont] = new this.tarea(cont+1, this.tiempo[cont], this.tamano[cont], 0);
        }
  }
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    asignar() {
      if (this.isProcesado()) {
        for (let i = 0; i < this.tareas.length; i++) {
          let tarea = this.tareas[i];
          if (tarea.tamano < this.memoria && tarea.estado === 1) {
            this.memorias.push(
              new Memoria(
                this.numBloque++,
                tarea.tamano,
                tarea.numero,
                tarea.tiempo
              )
            );
            tarea.estado = 2;
            this.memoria = this.memoria - tarea.tamano;
          }
        }
      } else {
        for (let i = 0; i < this.tareas.length; i++) {
          tarea = this.tareas[i];
          if (tarea.tamano < this.memoria) {
            this.memorias.push(
              new Memoria(
                this.numBloque++,
                tarea.tamano,
                tarea.numero,
                tarea.tiempo
              )
            );
            this.tarea.estado = 2;
            this.memoria = this.memoria - this.tarea.tamano;
            // this.mostrarTabla() // TODO pendiente
            // this.mostrarTablasP(...) TODO pendiente
          } else {
            tarea.estado = 1;
            // this.mostrarTabla() // TODO pendiente
            // this.mostrarTablasP(...) TODO pendiente
          }
        }
      }
    }
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
isProcesado() {
    let cont = 0;
    for (let i = 0; i < this.tarea.length; i++) {
      if (this.tarea[i].estado !== 0) {
        cont++;
      }
    }
    return cont === 25;
  }
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    getTareaM(num){
        let cont=0;
        for(let i= 0; i <this.tarea.lenght; i++){
            if(this.numero() === num){
                return this.tarea[i];
            }
        }
        return null;
    }
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  getMemoriaT(num){
        for(let i= 0; i <this.memoria.lenght; i++)
        {
            if(this.bloque() == num)
            {
                return this.memoria[i];
            }
        }
        return null;
  }
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}
