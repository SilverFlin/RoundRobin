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
class Proceso 
{
  
  
  constructor() 
  {
        const QUANTUM = 5;
        let memoria= 50000;
        let numBloque = 1;
        let empi=0;
        const tiempo =  [1,1,4,6,10,2,3,7,2,7,5,8,10,8,3,6,4,8,4,8,5,5,7,6,10];
        const tamano =  [760,3210,4190,5760,9350,1380,5950,2030,2550,420,3930,8940,6890,9140,220,6580,740,3610,6990,3820,3290,2710,7540,7540,8390];
        const tarea= [];
        for(let cont=0; cont<25; cont++)
        {
            tarea[cont] = new Tarea(cont+1, tiempo[cont], tamano[cont], 0);
        }
    
  }
  
    }
}
