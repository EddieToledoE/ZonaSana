<ul>
        {productosElegidos.map((producto) => (
          <li key={producto._id}>
            {producto._id} - Cantidad: {producto.cantidad}{" "}
            <button type="button" onClick={() => quitarProducto(producto._id)}>
              Quitar
            </button>
            <label htmlFor={`cantidad-${producto._id}`}>
              Actualizar Cantidad:
            </label>
            <input
              type="number"
              id={`cantidad-${producto._id}`}
              value={producto.cantidad}
              onChange={(e) => actualizarCantidad(producto._id, e.target.value)}
              min="1" // Establecer un valor mínimo para la cantidad
            />
          </li>
        ))}
      </ul>



return (
  <div className="">
    <label className="titulo-input" htmlFor="producto">
      Selecciona un producto:
    </label>
    <select
      className="productos-agregar"
      id="producto"
      value={productoSeleccionado}
      onChange={(e) => setProductoSeleccionado(e.target.value)}
    >
      
      <option value="">Selecciona un producto</option>
      {productos.map((producto) => (
        <option key={producto._id} value={producto._id}>
          {producto.nombre}
        </option>
      ))}
    </select>
    <label className="titulo-input" htmlFor="cantidad">
      Cantidad:
    </label>
    <input
      className="Cantidad_Productos"
      type="number"
      id="cantidad"
      value={cantidad}
      onChange={(e) => setCantidad(e.target.value)}
      min="1" // Establecer un valor mínimo para la cantidad
    />
    <button type="button" onClick={agregarProducto}>
      Agregar Producto
      {productosElegidos.length}
    </button>
    <div className="Productos_Seleccionados">

    </div>
  </div>
);
}