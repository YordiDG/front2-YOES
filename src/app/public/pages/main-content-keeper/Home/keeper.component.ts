import {Component, HostListener, OnInit} from '@angular/core';
import {Router, Routes} from "@angular/router";
import { ProductoService } from "../../../services/producto.service";
import {Producto} from "../../../models/producto.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";


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
  category: string;
  disponibilidad: string;
  cantidad_stock: number;
  valoracion: string;
  contador: number = 0;
  cantidad:number;
  carrito: Carrito[] = [];
  productoSeleccionado: any;
  mostrarMensaje: boolean = false;
  totalCarrito: number = 0;
  mostrarFormularioCarrito: boolean = false;
  searching: boolean = false;
  productosFiltrados: Producto[] = [];
  categoriaSeleccionada: string = '';
  showDialog: boolean = false;
  isMenuOpen: boolean = false;
  producto: boolean = false;

  currentSlide: number = 0;

  slides = [
    { title: 'Verduras', description: 'Brócoli, rabanito, zanahoria', imageUrl: 'https://media.discordapp.net/attachments/1239050988195942465/1239447880758988880/138792896_dcaaded0-20e7-4f47-adb5-91c1d5e35705-removebg-preview.png?ex=6642f54a&is=6641a3ca&hm=74c606fcf9d9c96e7d1f8de35f1f9e557e8001c3f8d30d0fda7bba51897821cb&=&format=webp&quality=lossless&width=388&height=388', category: 'verduras' },
    { title: 'Carnes', description: 'Cerdo, pescado, pollo,res', imageUrl: 'https://media.discordapp.net/attachments/1239050988195942465/1239056622769410049/93505921_Meat_in_its_raw_state_-16-removebg-preview.png?ex=664188e7&is=66403767&hm=1c31fb515a2336e812980268dc8d1ff4c2956ebf8e34e40a98e88ba777f401d0&=&format=webp&quality=lossless&width=388&height=388', category: 'carnes' },
    { title: 'Frutas', description: 'Uva, plátano, manzana', imageUrl: 'https://media.discordapp.net/attachments/1239050988195942465/1239056623167606875/81678404_Mix_fruits_-7-removebg-preview.png?ex=664188e7&is=66403767&hm=fe96f65c6bbf272ccb620fd521bc4cf912ca79c78cc647fcc641be48ebc6e36f&=&format=webp&quality=lossless&width=388&height=388', category: 'frutas'},
    { title: 'Abarrotes', description: 'Arroz, azúcar, aceite', imageUrl: 'https://media.discordapp.net/attachments/1239050988195942465/1239056621808648293/pixelcut-export-removebg-preview.png?ex=664188e7&is=66403767&hm=fa52f33e1b0d55e0aa9c5de336734788cd43770bebc787c31aebac0a2d54d430&=&format=webp&quality=lossless&width=358&height=358', category: 'abarrotes' },
    { title: 'Lácteos', description: 'Queso, yogurt,leche', imageUrl: 'https://media.discordapp.net/attachments/1239050988195942465/1239056623616659476/productos-lacteos-mesa-madera.png?ex=6642da67&is=664188e7&hm=889c2418eaf1f2ec1a1df9d9ff8e764273cc026e7ecfc4fd490fa42486e7783a&=&format=webp&quality=lossless&width=306&height=311', category: 'lacteos'},
    { title: 'Panisteria', description: 'Pan, queques, tortas', imageUrl: 'https://media.discordapp.net/attachments/1239050988195942465/1239056622496645130/91630062_Delicious_uzbek_pastries_-11-removebg-preview.png?ex=6642da67&is=664188e7&hm=a1e1aa86febd160627e57ab6dc27b1111f07b06c9537cb825e81bee247fab56c&=&format=webp&quality=lossless&width=388&height=388', category: 'panisteria' },
    { title: 'Comidas', description: 'Arroz con pollo, Aji de gallina,...', imageUrl: 'https://media.discordapp.net/attachments/1239050988195942465/1239451426606809119/ceviche-peruano-removebg-preview.png?ex=6642f897&is=6641a717&hm=56da533ca832eaa06a33453f7761100c2de3388360fc5c35230b22ca920a080f&=&format=webp&quality=lossless&width=419&height=326', category: 'comida' },
  ];


  constructor(private router: Router, private productoService: ProductoService, private dialog: MatDialog,private snackBar: MatSnackBar) {
    this.name = '';
    this.price = 0;
    this.description = '';
    this.category = '';
    this.disponibilidad = '';
    this.cantidad_stock = 0;
    this.valoracion = '';
    this.cantidad=0;
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

  /*-----------*/
  /*********** seccion de compras ****************/
  incrementarContador() {
    this.contador++;
    this.snackBar.open('Producto añadido', 'Cerrar', {
      duration: 2000,
    });
  }

  agregarAlCarrito(producto: Producto) {
    const precioTotalProducto = producto.price;

    // Verificar si agregar este producto excede el límite de compra total
    if ((this.totalCarrito + precioTotalProducto) > 700) {
      this.mostrarMensaje = true; // Mostrar mensaje de límite de compra total alcanzado
      return;
    }

    // Verificar si el producto ya está en el carrito
    const productoEnCarrito = this.carrito.find(item => item.id === producto.id);

    if (productoEnCarrito) {
      // Verificar si se ha alcanzado el límite de 5 unidades para este producto
      if (productoEnCarrito.cantidad < 5) {
        productoEnCarrito.cantidad++;
        productoEnCarrito.total += precioTotalProducto; // Actualizar el precio total del producto en el carrito
      } else {
        this.mostrarMensaje = true; // Mostrar mensaje de límite alcanzado para este producto
        return;
      }
    } else {
      // Si el producto no está en el carrito, agregarlo con una cantidad de 1
      this.carrito.push({...producto, cantidad: 1, total: precioTotalProducto});
    }

    // Actualizar el precio total del carrito sumando los precios totales de todos los productos
    this.actualizarTotalCarrito(); // Función para actualizar el total del carrito
    this.incrementarContador();
  }

  actualizarTotalCarrito() {
    this.totalCarrito = this.carrito.reduce((total, item) => total + item.total, 0);
  }



  removerDelCarrito(index: number) {
    const producto = this.carrito[index];
    // Restar el precio total del producto eliminado
    this.totalCarrito -= producto.price * producto.cantidad;
    this.carrito.splice(index, 1); // Eliminar el producto del carrito
    this.contador -= producto.cantidad; // Restar la cantidad del producto eliminado del contador

    if (this.carrito.length === 0) {
      this.contador = 0; // Si el carrito está vacío, reiniciar el contador a cero
    }

    // Actualizar el precio total del carrito
    this.actualizarTotalCarrito(); // Llamar a la función para actualizar el total del carrito
  }


  cantidadAnadida(productId: number): number {
    let cantidadTotal = 0;
    for (const item of this.carrito) {
      if (item.id === productId) {
        cantidadTotal += item.cantidad;
      }
    }
    return cantidadTotal;
  }

  productosComprados() {
    if (this.contador === 0) {
      alert("No hay ningún producto añadido en el carrito");
    } else {
      this.abrirCerrarFormularioCarrito();
    }
  }


  /*****************************/

  isDisponible(producto: Producto): boolean {
    return producto.cantidad_stock > 0;
  }
  /*Productos de carrucel*/

  verProductosEnCategoria(categoria: string): void {
    this.router.navigate(['/' + categoria.toLowerCase()]);
  }

  nextSlide() {
    if (this.currentSlide < this.slides.length - 4) {
      this.currentSlide += 1;
    } else {
      this.currentSlide = 0;
    }
  }

  prevSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide -= 1;
    } else {
      this.currentSlide = this.slides.length - 4;
    }
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }

  get visibleSlides() {
    return this.slides.slice(this.currentSlide, this.currentSlide + 4);
  }


  /*este es el fomr de login*/

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

  verDetalle(producto: any) {
    this.productoSeleccionado = producto;
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
      this.verDetalle(this.producto);
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
