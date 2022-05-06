class Memoria {
  constructor(bloque, tamaño, proceso, tiempo) {
    this.bloque = bloque;
    this.tamaño = tamaño;
    this.proceso = proceso;
    this.tiempo = tiempo;
  }
}
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
class Tarea {
  constructor(numero, tiempo, tamano, estado) {
    this.numero = numero;
    this.tiempo = tiempo;
    this.tamano = tamano;
    this.estado = estado;
  }

  getSEstado() {
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
  }
}
class Proceso {
  constructor() {
    this.QUANTUM = 5;
    this.memoria = 50000;
    this.numBloque = 1;
    this.empi = 0;
    this.tiempo = [
      1, 1, 4, 6, 10, 2, 3, 7, 2, 7, 5, 8, 10, 8, 3, 6, 4, 8, 4, 8, 5, 5, 7, 6,
      10,
    ];
    this.tamano = [
      760, 3210, 4190, 5760, 9350, 1380, 5950, 2030, 2550, 420, 3930, 8940,
      6890, 9140, 220, 6580, 740, 3610, 6990, 3820, 3290, 2710, 7540, 7540,
      8390,
    ];
    this.tareas = [];
    this.memorias = [];
    this.mmemorias = [];
    for (let cont = 0; cont < 25; cont++) {
      this.tareas[cont] = new Tarea(
        cont + 1,
        this.tiempo[cont],
        this.tamano[cont],
        0
      );
    }
  }
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  asignar() {
    if (this.isProcesado()) {
      for (let tarea of this.tareas) {
        if (tarea.tamano < this.memoria && tarea.estado === 1) {
          this.memorias.push(new Memoria(this.numBloque++,tarea.tamano,tarea.numero,tarea.tiempo));
          tarea.estado = 2;
          this.memoria = this.memoria - tarea.tamano;
        }
      }
    } else {
      for (let tarea of this.tareas) {
        if (tarea.tamano < this.memoria) {
          this.memorias.push(new Memoria(this.numBloque++,tarea.tamano,tarea.numero,tarea.tiempo));
          this.tareas.estado = 2;
          this.memoria = this.memoria - this.tareas.tamano;
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
    for (let tarea of this.tareas) {
      if (tarea.estado !== 0) {
        cont++;
      }
    }
    return cont === 25;
  }
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  getTareaM(num) {
    for (let tarea of this.tareas) {
      if (tarea.numero === num) {
        return tarea
      }
    }
    return null;
  }
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  getMemoriaT(num) {
    for (let memoria of this.memorias) {
      if (memoria.bloque === num) {
        return memoria
      }
    }
    return null;
  }
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  isTerminado() {
        let cont=0;
        for(var of this.tareas) {
            if(var.getEstado() === 3)
            {
                cont++;
            }
        }
        return cont === 25;
    }
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  vueltaAt() {
        let total = this.memorias.length-1;
        for(let cont=0; cont<total; cont++) {
            this.atender();
        }
    }
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  isAsignadoT() {
        let cont=0;
        for(var of this.tareas){
            if(var.estado === 2) {
                cont++;
            }
        }
        return cont === 25;
    }
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}
