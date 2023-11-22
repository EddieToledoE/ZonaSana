{productoEnviado.map((producto, index) => (
    <div
      style={{ display: "flex", flexDirection: "column" }}
      key={index}
    >
      <p>Nombre: {producto._id.nombre}</p>
      <p>Marca: {producto._id.marca}</p>
      
      <p>Cantidad: {producto.cantidad}</p>
      <img
        width={70}
        height={70}
        src={producto._id.url}
        alt={`Imagen de ${producto._id.nombre}`}
      />
    </div>
  ))}