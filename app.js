const sleep = (tiempo) => new Promise((r) => setTimeout(r, tiempo));

let tracker = 0;
let flag = true
//------------------Selectores----------------
const taskTableDom = document.getElementById("taskTable");
const memoryTableDom = document.getElementById("memoryTable");
const procOrdTable = document.getElementById("procOrdTable");
const procesadorTable = document.getElementById("procesadorTable");
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

const whiteBlack = document.getElementById("whiteBlack");

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
        return "En Espera";
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
  QUANTUM = 5;
  memoria = 50000;
  numBloque = 1;
  empi = 0;
  memorias = [];
  mmemorias = [];
  tareas = [];
  constructor() {
    let tiempo = [1, 1, 4, 6, 10, 2, 3, 7, 2, 7, 5, 8, 10, 8, 3, 6, 4, 8, 4, 8, 5, 5, 7, 6,10];
    let tamano = [760, 3210, 4190, 5760, 9350, 1380, 5950, 2030, 2550, 420, 3930, 8940,6890, 9140, 220, 6580, 740, 3610, 6990, 3820, 3290, 2710, 7540, 7540,8390];
    for (let cont = 0; cont < 25; cont++) {
      this.tareas[cont] = new Tarea(cont + 1, tiempo[cont], tamano[cont], 0);
    }
  }
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  async asignar() {
    if (this.isProcesado()) {
      for (let tarea of this.tareas) {
        if (tarea.tamano < this.memoria && tarea.estado === 1) {
          this.memorias.push(new Memoria(this.numBloque++,tarea.tamano,tarea.numero,tarea.tiempo));
          tarea.estado = 2;
          this.memoria = this.memoria - tarea.tamano;
        }
      }
    } else {
      if (tracker === 25) {
        tracker = 0;
        flag = false
      }
      for (let i = tracker; i < tracker + 1; i++) {
        let tarea = this.tareas;
        if (tarea[i].tamano < this.memoria) {
          this.memorias.push(new Memoria(this.numBloque++,tarea[i].tamano,tarea[i].numero,tarea[i].tiempo));
          tarea[i].estado = 2;
          this.memoria = this.memoria - tarea[i].tamano;
          this.mostrarTablasP(this.memorias[this.empi].bloque, "", "");
        } else {
          tarea[i].estado = 1;
          this.mostrarTablasP(this.memorias[this.empi].bloque, "", "");
        }
      }
      tracker++;
    }
    await sleep(1400)
  }
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  isProcesado() {
    let cont = 0;
    for (let tarea of this.tareas) {
      if (tarea.estado !== 0) cont++;
    }
    return cont === 25;
  }
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  getTareaM(num) {
    for (let tarea of this.tareas) {
      if (tarea.numero === num) return tarea;
    }
    return null;
  }
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  getMemoriaT(num) {
    for (let mem of this.memorias) {
      if (mem.bloque === num)return mem;
    }
    return null;
  }
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  async atender() {
    if (this.empi >= this.memorias.length || this.empi < 0) {
      this.empi = 0;
    }
    let bloque = this.memorias[this.empi].bloque;

    if (this.isProcesado()) {
      if (this.memorias[this.empi].tiempo <= this.QUANTUM &&!this.mmemorias.includes(this.memorias[this.empi])) {
        if (this.getTareaM(this.memorias[this.empi].proceso) !== null) {
          this.getTareaM(this.memorias[this.empi].proceso).estado = 3;
          this.memoria = this.memoria + this.memorias[this.empi].tamaño;
          this.mostrarTablasP(bloque, "", "");
          this.memorias.splice(this.empi, 1);
          this.empi = this.empi - 1;
          this.asignar();
          this.mostrarTablasP(bloque, "", "");
        }
        this.empi++;
      } else if (this.mmemorias.includes(this.memorias[this.empi])) {
        let mem = this.memorias[this.empi];
        mem.tiempo = this.memorias[this.empi].tiempo - this.QUANTUM;
        this.memorias[this.empi] = mem;
        this.mostrarTablasP(this.memorias[this.empi].bloque,"",this.memorias[this.empi].bloque);
        if (this.memorias[this.empi].tiempo <= this.QUANTUM) {
          this.getTareaM(this.memorias[this.empi].proceso).estado = 3;
          this.memoria = this.memoria + this.memorias[this.empi].tamaño;
          this.mostrarTablasP(bloque, "", "");
          this.memorias.splice(this.empi, 1);
          this.mmemorias.splice(this.empi, 1);
          this.empi -= 1;
          if (!this.isAsignadoT()) {
            this.asignar();
            this.mostrarTablasP(bloque, "", "");
          }
        }
        this.empi++;
      } else if (this.memorias[this.empi].tiempo > this.QUANTUM &&!this.mmemorias.includes(this.memorias[this.empi])) {
        this.mmemorias.push(this.memorias[this.empi]);
        let contexto = this.memorias[this.empi].bloque;
        this.mostrarTablasP(bloque, contexto, "");
        this.empi++;
      }
      tracker++;
    }
    await sleep(1400)
  }
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  isTerminado() {
    let cont = 0;
    for (let tarea of this.tareas) {
      if (tarea.estado === 3)cont++;
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
      if (tarea.estado === 2) cont++;
    }
    return cont === 25;
  }
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  mostrarTabla() {
    // Tabla de Trabajos & Tabla de Memoria
    this.clearTables();
    this.tablaTareasDOM();
    this.tablaProcesosDOM();
    this.tablaProcesosOrdenadosDOM();
    this.memoriaDOM();
    if(flag) taskTableDom.children[tracker].style.backgroundColor = "#79edec";
  }
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  clearTables() {
    while (taskTableDom.firstChild) {
      taskTableDom.removeChild(taskTableDom.firstChild);
    }
    while (memoryTableDom.firstChild) {
      memoryTableDom.removeChild(memoryTableDom.firstChild);
    }
    while (procOrdTable.firstChild) {
      procOrdTable.removeChild(procOrdTable.firstChild);
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
      listItem.classList.add("d-flex","justify-content-between","align-items-start");
      divContent.classList.add("ms-2", "me-auto");
      divHeading.classList.add("fw-bold");
      timeBadge.classList.add("badge", "bg-primary", "rounded-pill");

      divHeading.appendChild(document.createTextNode(`Tamaño: ${this.tareas[cont].tamano}`));
      divContent.appendChild(divHeading);
      divContent.appendChild(document.createTextNode(`Estado: ${this.tareas[cont].getSEstado()}`));
      timeBadge.appendChild(document.createTextNode(`${this.tareas[cont].tiempo}s`));
      listItem.appendChild(divContent);
      listItem.appendChild(timeBadge);

      // Colores
      if (this.tareas[cont].getSEstado() === "En Espera") {
        taskTableDom.appendChild(listItem).classList.add("list-group-item", "list-group-item-danger");
      } else if (this.tareas[cont].getSEstado() === "Ejecutando") {
        taskTableDom.appendChild(listItem).classList.add("list-group-item", "list-group-item-warning");
      } else if (this.tareas[cont].getSEstado() === "Terminado") {
        taskTableDom.appendChild(listItem).classList.add("list-group-item", "list-group-item-success");
      }
    }
  }
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  tablaProcesosDOM() {
    if (this.memorias[0] === undefined) {
      // Genera tabla de memoria vacia
      const listItem = document.createElement("li");
      listItem.appendChild(document.createTextNode(` ~ [Vacio] ~`));
      memoryTableDom.appendChild(listItem)
        .classList.add("list-group-item", "list-group-item-success");
      listItem.style.textAlign = "center";
    } else {
      for (const mem of this.memorias) {
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
          document.createTextNode(`Tamaño: ${mem.tamaño}`)
        );
        divContent.appendChild(divHeading);
        divContent.appendChild(
          document.createTextNode(
            `Bloque: ${mem.bloque} Proceso: ${mem.proceso}`
          )
        );
        timeBadge.appendChild(document.createTextNode(`${mem.tiempo}s`));
        listItem.appendChild(divContent);
        listItem.appendChild(timeBadge);

        memoryTableDom.appendChild(listItem).classList.add("list-group-item", "list-group-item-success");
      }
    }
    // }
  }
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  tablaProcesosOrdenadosDOM() {
    if (this.mmemorias[0] === undefined) {
      // Genera tabla de procesos vacia
      const listItem = document.createElement("li");
      listItem.appendChild(document.createTextNode(` ~ [Vacio] ~`));
      procOrdTable.appendChild(listItem).classList.add("list-group-item", "list-group-item-success");
      listItem.style.textAlign = "center";
    } else {
      for (const mem of this.mmemorias) {
        const listItem = document.createElement("li");
        const divHeading = document.createElement("div");
        const divContent = document.createElement("div");
        const timeBadge = document.createElement("span");
        listItem.style.textAlign = "center";
        listItem.classList.add("d-flex","justify-content-between","align-items-start");
        divContent.classList.add("ms-2", "me-auto");
        divHeading.classList.add("fw-bold");
        timeBadge.classList.add("badge", "bg-danger", "rounded-pill");
        divHeading.appendChild(document.createTextNode(`Tamaño: ${mem.tamaño}`));
        divContent.appendChild(divHeading);
        divContent.appendChild(document.createTextNode(`Bloque: ${mem.bloque} Proceso: ${mem.proceso}`));
        timeBadge.appendChild(document.createTextNode(`${mem.tiempo - 5}s`));
        listItem.appendChild(divContent);
        listItem.appendChild(timeBadge);

        procOrdTable.appendChild(listItem).classList.add("list-group-item", "list-group-item-success");
      }
    }
  }
  mostrarTablasP(enBloque, a, b) {
    // -------Procesador-----
    let sig = "";
    if (!this.isProcesado() || this.memorias[0] === undefined) {
    } else {
      if (this.memorias.length !== 1 && this.empi < this.memorias.length - 1) {
        sig = this.memorias[this.empi + 1].bloque;
      } else if (this.memorias.length !== 1 &&this.empi === this.memorias.length - 1) {
        sig = this.memorias[0].bloque;
      }

      atendiendo.innerText = `${enBloque}`;
      siguente.innerText = `${sig}`;
      guardandoContexto.innerText = `${a}`;
      cargandoContexto.innerText = `${b}`;
    }
  }
}
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//------------------Ejecutar----------------
let proceso = new Proceso();
proceso.mostrarTabla();

const iniciar = () => {
  if (!proceso.isProcesado()) {
    proceso.asignar();
  } else {
    proceso.atender();
  }
  if (tracker === 25) {
    tracker = 0;
    flag = false
  }
};

//------------------Botones----------------
resetBtn.hidden = true;
stopAutoBtn.hidden = true;

startBtn.addEventListener("click", () => {
  iniciar();
  proceso.mostrarTabla();
  resetBtn.hidden = false;
});
//next
nextBtn.addEventListener("click", () => {
  for (let i = 0; i < 5; i++) {
    iniciar();
    proceso.mostrarTabla();
  }
});
//reset
fullBtn.addEventListener("click", () => {
  for (let i = 0; i < 25; i++) {
    iniciar();
    proceso.mostrarTabla();
  }
});

resetBtn.addEventListener("click", () => {
  proceso.clearTables();
  proceso = new Proceso();
  proceso.mostrarTabla();
  tracker=0
  flag = true
});

autoBtn.addEventListener("click", () => {
  try {
    if (proceso.isTerminado()) {
      alert("No quedan más trabajos");
    } else {
      const idAuto = setInterval(() => {
        iniciar();
        proceso.mostrarTabla();
      }, 1600);
      resetBtn.hidden = false;
      stopAutoBtn.hidden = false;
      autoBtn.hidden = true;
      stopAutoBtn.addEventListener("click", () => {
        clearInterval(idAuto);
        whiteBlack.style.color = "black";
        memoryQty.style.color = "black";
        document.body.style.backgroundImage = "";
        stopAutoBtn.hidden = true;
        autoBtn.hidden = false;
      });
      whiteBlack.style.color = "white";
      memoryQty.style.color = "white";

      document.body.style.backgroundImage ="url('https://c.tenor.com/qhZUzWdQLX8AAAAM/chinese-tom-tom-and-jerry.gif')";

    }
  } catch (e) {
    console.log("Trabajos Finalizados");
  }
});
