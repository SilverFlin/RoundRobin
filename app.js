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
class Tarea 
{
conastructor(numero,tiempo,tamano,estado) 
  {
        this.numero = numero;
        this.tiempo = tiempo;
        this.tamano = tamano;
        this.estado = estado;
    
        getSEstado()
    {
        switch(estado)
        {
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
}
