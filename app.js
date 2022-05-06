//------------------Selectores----------------
const taskTableDom = document.getElementById("taskTable");
const memoryTableDom = document.getElementById("memoryTable");
const procOrdTable = document.getElementById("procOrdTable");
const listItem = document.createElement("li");

const nextBtn = document.querySelector("#nextBtn");
const startBtn = document.querySelector("#startBtn");
const fullBtn = document.querySelector("#fullBtn");
const resetBtn = document.querySelector("#resetBtn");
const autoBtn = document.querySelector("#autoBtn");
const stopAutoBtn = document.querySelector("#stopAutoBtn");

const memoryBar = document.querySelector("#memoryBar");
const memoryQty = document.querySelector("#memoryQty");

const atendiendo = document.getElementById("atendiendo");
const siguente = document.getElementById("siguente");
const guardandoContexto = document.getElementById("guardandoContexto");
const cargandoContexto = document.getElementById("cargandoContexto");
// ---------------------------------------------
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
        return "En Espera";
      case 2:
        return "Ejecutando";
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
        1
      );
    }
  }
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  asignar() {
    if (this.isProcesado()) {
      for (let tarea of this.tareas) {
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
      for (let tarea of this.tareas) {
        if (tarea.tamano < this.memoria) {
          this.memorias.push(
            new Memoria(
              this.numBloque++,
              tarea.tamano,
              tarea.numero,
              tarea.tiempo
            )
          );
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
        return tarea;
      }
    }
    return null;
  }
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  getMemoriaT(num) {
    for (let memoria of this.memorias) {
      if (memoria.bloque === num) {
        return memoria;
      }
    }
    return null;
  }
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  atender() {
    if (this.empi >= this.memorias.length || empi < 0) {
      this.empi = 0;
    }
    let bloque = this.memorias[this.empi].bloque

    if (this.isProcesado()) {
      if (this.memorias[this.empi].tiempo <= this.QUANTUM && !this.mmemorias.includes(this.memorias[this.empi])) {
        if (this.getTareaM(memorias[this.empi].proceso) != undefined) {
          this.getTareaM(this.memorias[this.empi].proceso).estado = 3;
          this.memoria += this.memorias[this.empi].tamaño;
          this.mostrarTabla();
          this.mostrarTablasP(bloque,"","");
          this.empi -= 1;
          this.asignar();
          this.mostrarTabla();
          this.mostrarTablasP(bloque,"","");
        }
        this.empi++;
      } else if (this.mmemorias.includes(memorias[this.empi])) {
        let mem = memorias[this.empi];
        mem.tiempo = memorias[this.empi].tiempo - this.QUANTUM;
        this.memorias[this.empi] = mem
        this.mostrarTabla();
        this.mostrarTablasP(memorias[this.empi].bloque, "", memorias[this.empi].bloque);
        if (this.memorias[this.empi].tiempo <= this.QUANTUM) {
          this.getTareaM(this.memorias[this.empi].proceso).estado = 3;
          this.memoria += this.memorias[this.empi].tamaño;
          this.mostrarTabla();
          this.mostrarTablasP(bloque, "", "");
          this.memorias.splice(this.empi,1);
          this.mmemorias.splice(this.empi,1);
          this.empi -= 1;

          if (!this.isAsignadoT()) {
            this.asignar();
            this.mostrarTabla();
            this.mostrarTablasP(bloque, "", "");
          }
        }
        this.empi++;
      } else if (this.memorias[this.empi].tiempo > this.QUANTUM && !this.mmemorias.includes(this.memorias[this.empi])) {
        this.mmemorias.push(this.memorias[this.empi]);
        let contexto = this.memorias[this.empi].bloque;
        this.mostrarTabla();
        this.mostrarTablasP(bloque, contexto, "");

        this.empi++;
      }
    }
  }
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  isTerminado() {
    let cont = 0;
    for (let tarea of this.tareas) {
      if (tarea.getEstado() === 3) {
        cont++;
      }
    }
    return cont === 25;
  }
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  vueltaAt() {
    let total = this.memorias.length - 1;
    for (let cont = 0; cont < total; cont++) {
      this.atender();
    }
  }
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  isAsignadoT() {
    let cont = 0;
    for (let tarea of this.tareas) {
      if (tarea.estado === 2) {
        cont++;
      }
    }
    return cont === 25;
  }
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  mostrarTabla() {
    // Tabla de Trabajos & Tabla de Memoria
    this.clearTables();
    this.tablaTareasDOM();
    this.tablaProcesosDOM();
    this.memoriaDOM();
  }
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  clearTables() {
    while (taskTableDom.firstChild) {
      taskTableDom.removeChild(taskTableDom.firstChild);
    }
    while (memoryTableDom.firstChild) {
      memoryTableDom.removeChild(memoryTableDom.firstChild);
    }
  }
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    clearTables() {
    while (taskTableDom.firstChild) {
      taskTableDom.removeChild(taskTableDom.firstChild);
    }
    while (memoryTableDom.firstChild) {
      memoryTableDom.removeChild(memoryTableDom.firstChild);
    }
  }
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    memoriaDOM() {
    const memoryPercentage = (100 * this.memoria) / 50000;
    let colorMemoryBar = "progress-bar bg-success";
    if (memoryPercentage >= 75) {
      colorMemoryBar = "progress-bar bg-success";
    } else if (memoryPercentage >= 50) {
      colorMemoryBar = "progress-bar bg-info";
    } else if (memoryPercentage >= 25) {
      colorMemoryBar = "progress-bar bg-warning";
    } else {
      colorMemoryBar = "progress-bar bg-danger";
    }
    memoryBar.className = `${colorMemoryBar}`;
    memoryBar.style = `width: ${memoryPercentage}%`;
    memoryBar.ariaValueNow = `${Math.round(memoryPercentage)}`;
    memoryQty.innerHTML = `Memoria Actual ${memoryPercentage}% [${this.memoria}/50000]`;
  }
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    tablaTareasDOM() {
    for (let cont = 0; cont < 25; cont++) {
      const listItem = document.createElement("li");
      const divHeading = document.createElement("div");
      const divContent = document.createElement("div");
      const timeBadge = document.createElement("span");
      listItem.style.textAlign = "center";
      listItem.classList.add(
        "d-flex",
        "justify-content-between",
        "align-items-start"
      );
      divContent.classList.add("ms-2", "me-auto");
      divHeading.classList.add("fw-bold");
      timeBadge.classList.add("badge", "bg-primary", "rounded-pill");

      divHeading.appendChild(
        document.createTextNode(`Tamaño: ${this.tareas[cont].tamano}`)
      );
      divContent.appendChild(divHeading);
      divContent.appendChild(
        document.createTextNode(`Estado: ${this.tareas[cont].getSEstado()}`)
      );
      timeBadge.appendChild(
        document.createTextNode(`${this.tareas[cont].tiempo}s`)
      );
      listItem.appendChild(divContent);
      listItem.appendChild(timeBadge);

      // Colores
      if (this.tareas[cont].getSEstado() === "En Espera") {
        taskTableDom
          .appendChild(listItem)
          .classList.add("list-group-item", "list-group-item-danger");
      } else if (this.tareas[cont].getSEstado() === "Ejecutando") {
        taskTableDom
          .appendChild(listItem)
          .classList.add("list-group-item", "list-group-item-warning");
      } else if (this.tareas[cont].getSEstado() === "Terminado") {
        taskTableDom
          .appendChild(listItem)
          .classList.add("list-group-item", "list-group-item-success");
      }
    }
  }
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  tablaProcesosDOM() {
    // if (this.memorias[0]) {
    if (this.mmemorias[0] === undefined) {
      // Genera tabla de memoria vacia
      const listItem = document.createElement("li");
      listItem.appendChild(document.createTextNode(` ~ [Vacio] ~`));
      memoryTableDom
        .appendChild(listItem)
        .classList.add("list-group-item", "list-group-item-success");
      listItem.style.textAlign = "center";
    } else {
      for (const memoria of this.mmemorias) {
        const listItem = document.createElement("li");
        const divHeading = document.createElement("div");
        const divContent = document.createElement("div");
        const timeBadge = document.createElement("span");
        listItem.style.textAlign = "center";
        listItem.classList.add(
          "d-flex",
          "justify-content-between",
          "align-items-start"
        );
        divContent.classList.add("ms-2", "me-auto");
        divHeading.classList.add("fw-bold");
        timeBadge.classList.add("badge", "bg-primary", "rounded-pill");

        divHeading.appendChild(
          document.createTextNode(`Tamaño: ${memoria.tamaño}`)
        );
        divContent.appendChild(divHeading);
        divContent.appendChild(
          document.createTextNode(
            `Bloque: ${memoria.bloque} Proceso: ${memoria.proceso}`
          )
        );
        timeBadge.appendChild(document.createTextNode(`${memoria.tiempo}s`));
        listItem.appendChild(divContent);
        listItem.appendChild(timeBadge);

        console.log(memoria);
        memoryTableDom
          .appendChild(listItem)
          .classList.add("list-group-item", "list-group-item-success");
      }
    }
    // }
  }
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


}

//------------------Ejecutar----------------
let proceso = new Proceso();

//------------------Botones----------------
startBtn.addEventListener("click", () => {
    proceso.mostrarTabla();
});
//next
nextBtn.addEventListener("click", () => {
    proceso.clearTables();
});
//reset
fullBtn.addEventListener("click", () => {});

autoBtn.addEventListener("click", () => {});

resetBtn.addEventListener("click", () => {});
