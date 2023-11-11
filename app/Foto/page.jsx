"use client";
export default function Subirfoto() {
  return (
    <form onSubmit={handlesubmit}>
      <div>
        <h2>SUBIR FOTO</h2>
        <input
          type="file"
          onChange={(e) => {
            console.log(e.target.files[0]);
          }}
        />
      </div>
      <button>enviar</button>
    </form>
  );
}
