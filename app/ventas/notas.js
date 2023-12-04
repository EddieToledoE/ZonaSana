<div className="contenedor-producto">
<div className="Entradas-datos">
  <div className="text">
    <div className="t-in">
      <label className="titulo-input">Nombre del cliente:</label>
    </div>
    <div className="entradatext">
      <input
        className="datos-inv"
        type="text"
        placeholder="Julian Vicente"
        onChange={(event) => setNombre(event.target.value)}
      />
    </div>
  </div>
  <div className="text2">
    <div className="entradatext2">
      <SeleccionProductos
        onProductosSeleccionados={manejarProductosSeleccionados}
      />
    </div>
  </div>
  <div className="text2">
    <div className="entradatext">
      <button onClick={handleVenta}>Confirmar</button>
    </div>
  </div>
</div>
</div>




<div className="productos1">
<div className="titulos2">
  <h3>Punto de venta</h3>
</div>
<div className="contenedor-producto">
  <div className="Entradas-datos">
    <div className="text">
      <div className="t-in">
        <label className="titulo-input">Nombre del cliente:</label>
      </div>
      <div className="entradatext">
        <input
          className="datos-inv"
          type="text"
          placeholder="Julian Vicente"
          onChange={(event) => setNombre(event.target.value)}
        />
      </div>
    </div>
    <div className="text2">
      <div className="entradatext2">
        <SeleccionProductos
          onProductosSeleccionados={manejarProductosSeleccionados}
        />
      </div>
    </div>
    <div className="text2">
      <div className="entradatext">
        <button onClick={handleVenta}>Confirmar</button>
      </div>
    </div>
  </div>
</div>
</div>