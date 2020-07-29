import { Component, OnInit } from '@angular/core';
import {Usuarios} from "../../models/usuarios";
import {UsuariosService} from "../../services/usuarios.service";

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  public usuariosRegistrados: Usuarios;
  public usuariosEncontrados: any =[];

  constructor(private usuarioService: UsuariosService) {
    this.usuariosRegistrados = new Usuarios()
   }

  ngOnInit(): void {
    this.mostrarUsuarios();
  }

  // Consumo Servicio crearUsuario con el metodo agregarUsuario
  agregarUsuario() {
    this.usuarioService.crearUsuario(this.usuariosRegistrados).subscribe(
      (response:any)=>{
        if(response.statusCode == 200){
          alert(`Registro exitoso`);
          this.usuariosEncontrados = new Usuarios ();
          this.mostrarUsuarios();
        }else{
          alert("Error al registrar el ususario")
        }
      },
      (error)=>{
        var errormensaje = <any>error;
        if(errormensaje != null){
          console.log(error);
        }
      }
    );
  }
  // Consumo Servicio obtenerUsuarios con el método mostrarUsuarios
  mostrarUsuarios(){
    this.usuarioService.obtenerUsuario().subscribe(
      (response: any)=>{
        this.usuariosEncontrados =response.usuarios;
      },
      (error)=>{
        var errormensaje = <any>error;
        // if(errormensaje != null){
        //   console.log(error);
        // }
      }
    )
  }
  // Consumo Servicio actualizarUsuario con el método editarUsuario
  editarUsuario(usuario){
    this.usuarioService.actualizarUsuario(usuario._id, usuario).subscribe(
      (response: any) =>{
        if(response.statusCode == 200){
          alert(`Actualización exitosa`);
          this.usuariosEncontrados = new Usuarios ();
          this.mostrarUsuarios();
        }else{
          alert("No fue posible actualizar el usuario")
        }
      },
      (error)=>{
        if(error!=null){
          console.log(error)
        }
      }
    )
  }
  // Consumo Servicio eliminarUsuario con el método eliminarUsuario
  eliminarUsuario(idUsuario){
    this.usuarioService.eliminarUsuario(idUsuario).subscribe(
      (response:any)=>{
        if(response.statusCode == 200){
          alert(`Eliminación exitosa`);
          this.usuariosEncontrados = new Usuarios ();
          this.mostrarUsuarios();
        }else{
          alert("No fue posible eliminar el usuario")
        }
      },
      (error)=>{
        if(error!=null){
          console.log(error);
        }
      }
    )
  }
}
