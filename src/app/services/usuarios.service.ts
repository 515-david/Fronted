import { Injectable } from '@angular/core';

import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map} from 'rxjs/operators';
import {Observable} from "rxjs";

@Injectable()
export class UsuariosService {
  url="http://localhost:3000/api/"
  constructor(private _http:HttpClient) { }

  // SERVICIO CREAR USUARIO
crearUsuario(usuarioNuevo){
  let params = JSON.stringify(usuarioNuevo);
  console.log(params)
  let options = {
    headers: new HttpHeaders({ 'Content-type': 'application/json' }),
  };
  return this._http.post(this.url, params, options).pipe(map((res) => res));
 }

// SERVICIO OBTENER USUARIO
obtenerUsuario(){
  return this._http.get(this.url).pipe(map((res) => res));
}
// SERVICIO ACTUALIZAR USUARIO
actualizarUsuario(idUsuario, usuarioActualizado){
  let params = JSON.stringify(usuarioActualizado);
  let options = {
    headers: new HttpHeaders({
      "Content-type": "application/json"
    }),
  };
  return this._http.put(this.url + idUsuario, params, options)
  .pipe(map((res) => res));
}
// SERVICIO ELIMINAR USUARIO 
eliminarUsuario(idUsuario){
  let options = {
    headers: new HttpHeaders({"Content-type": "application/json"}),
  };
  return this._http.delete(this.url + idUsuario, options).pipe(map((res) => res));
}
}

