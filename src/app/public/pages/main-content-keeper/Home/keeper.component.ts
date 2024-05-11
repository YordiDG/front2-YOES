import {Component, HostListener, OnInit} from '@angular/core';
import { Router } from "@angular/router";
import { ProductoService } from "../../../services/producto.service";
import {Producto} from "../../../models/producto.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {DialogLogComponent} from "../../../dialog-log/dialog-log.component";

interface Carrito {
  id: number;
  cantidad: number;
  name: string;
  price: number;
  image: String;
  total : number;
}


@Component({
  selector: 'app-keeper',
  templateUrl: './keeper.component.html',
  styleUrls: ['./keeper.component.css']
})
export class KeeperComponent implements OnInit {
  Productos: Producto[] = [];
  Categorias: any[] = [];
  name: string;
  price: number;
  description: string;
  category: String;
  disponibilidad: string;
  cantidad_stock: number;
  valoracion: string;
  contador: number = 0;
  carrito: Carrito[] = [];
  productoSeleccionado: any;
  totalCarrito: number = 0;
  mostrarMensaje: boolean = false;
  mostrarFormularioCarrito: boolean = false;
  searching: boolean = false;

  verVentana: boolean = false;
  cierraVentana: boolean = false;

  productosFiltrados: Producto[] = [];
  todosLosProductos: Producto[] = [];
  categoriaSeleccionada: string = '';

  showDialog: boolean = false;

  isMenuOpen: boolean = false;


  constructor(private router: Router, private productoService: ProductoService, private dialog: MatDialog,private snackBar: MatSnackBar) {
    this.name = '';
    this.price = 0;
    this.description = '';
    this.category = '';
    this.disponibilidad = '';
    this.cantidad_stock = 0;
    this.valoracion = '';
  }

  ngOnInit() {
    this.productoService.getAll().subscribe(
      (response: any) => {
        this.Productos = response;
        this.Productos.forEach(producto => producto.mostrarDetalle = true);
      }
    );
    this.obtenerProductos();
    this.obtenerCategorias();
  }
  /**/

  showUserDialog(): void {
    this.showDialog = true;
  }

  hideUserDialog(): void {
    this.showDialog = false;
  }

  selectOption(option: string): void {
    console.log('Seleccionaste:', option);
    this.hideUserDialog();
  }

  /*----------------*/

  obtenerProductos() {
    this.productoService.getAll().subscribe(
      (response: any) => {
        this.Productos = response;
        this.Productos.forEach(producto => producto.mostrarDetalle = true);
      }
    );
  }

  obtenerCategorias() {
    this.productoService.getCategory().subscribe(
      (response: any[]) => {
        this.Categorias = response;
      },
      error => {
        console.error('Error al obtener categorías:', error);
      }
    );
  }

  filtrarProductos(categoria: string) {
    this.categoriaSeleccionada = categoria;
    this.productosFiltrados = this.Productos.filter(producto => producto.category.toLowerCase() === categoria.toLowerCase());
  }
  /*-----------*/

  cantidadAnadida(productId: number): number {
    return this.carrito.filter(item => item.id === productId).reduce((total, item) => total + item.cantidad, 0);
  }

  incrementarContador() {
    this.contador++;
    this.snackBar.open('Producto añadido', 'Cerrar', {
      duration: 2000,
    });
  }


  isTarjetaActiva(producto: any): boolean {
    return this.productoSeleccionado === producto;
  }

  agregarAlCarrito(producto: Producto) {
    const productoEnCarrito = this.carrito.find(item => item.id === producto.id);
    if (productoEnCarrito) {
      if (productoEnCarrito.cantidad < 5) {
        productoEnCarrito.cantidad++;
        this.totalCarrito += producto.price;
        this.incrementarContador();
      } else {
        this.mostrarMensaje;
      }
    } else {
      if ((this.totalCarrito + producto.price) <= 700) {
        this.carrito.push({...producto, cantidad: 1, total:0});
        this.totalCarrito += producto.price;
        this.incrementarContador();
      } else {
        this.mostrarMensaje;
      }
    }
  }


  verDetalle(producto: any) {
    this.productoSeleccionado = producto;
  }

  productosComprados() {
     if(this.contador == 0){
       alert("No hay ningun producto añadido en el carrito");

     }else{
       const producto: Producto[] = [];
       this.abrirCerrarFormularioCarrito();
     }
  }


  onFilter() {
    this.searching = true; // Marca que la búsqueda está en curso
    var filteredHouses = [...this.Productos];
    if (this.name) {
      filteredHouses = filteredHouses.filter(house => house.name.toLowerCase().includes(this.name.toLowerCase()));
    }
    this.Productos = filteredHouses;
    this.searching = false;
  }

  toReset() {
    this.name = '';

    if (!this.searching) {
      this.productoService.getAll().subscribe((response: any) => {
        this.Productos = response;
      });
    }
  }
  abrirCerrarFormularioCarrito() {
    this.mostrarFormularioCarrito = !this.mostrarFormularioCarrito;
  }

  cerrarFormularioCarrito() {
    this.mostrarFormularioCarrito = false;
  }

  cerrarFormulario(): void {

    this.hideUserDialog();
  }


  abrirFormularioCarrito() {
    this.mostrarFormularioCarrito = true;
  }
  removerDelCarrito(index: number) {
    const producto = this.carrito[index];
    this.totalCarrito -= producto.price * producto.cantidad;
    this.carrito.splice(index, 1);

    if (this.carrito.length === 0) {
      this.contador = 0;
    }
  }

  cerrarMensaje() {
    this.mostrarMensaje = false;
  }

  cerrarDetalle() {
    this.productoSeleccionado = null;
    this.mostrarFormularioCarrito = false;
  }

  mostrarProducto(producto: any): boolean {
    return this.Productos.length === 0 || this.Productos.includes(producto);
  }

  openUserDialog(): void {
    const dialogRef = this.dialog.open(DialogLogComponent, {
      width: '300px'
    });
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }


  signOut() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('accessToken');
    this.router.navigate(['']).then();
    console.log("Signed Out");
  }

  protected readonly Producto = Producto;

  goToKeeper(){
    this.router.navigateByUrl('/home-client');
  }

  goToMessenger(){
    this.router.navigateByUrl('/messenger-client');
  }
  goToProfile(){
    this.router.navigateByUrl('/profile-client');
  }
  goToFindHouse(){
    this.router.navigateByUrl('/find-house');
  }
  goToLogin(){
    this.router.navigateByUrl('/login');
  }
}
