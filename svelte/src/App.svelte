<script>
  import { db } from "./firebase";

  let prod = {
    name: "",
    color: "",
    price: "",
    company: "",
    size: "",
    description: "",
    imageURL: "",
  };
  let productos = [];

  db.collection("productos").onSnapshot((querySnapshot) => {
    let documentos = [];
    querySnapshot.forEach((doc) => {
      documentos.push({ ...doc.data(), id: doc.id });
    });
    productos = [...documentos];
    console.log(productos);
  });
  const addProd = async () => {
    await db
      .collection("productos")
      .doc()
      .set({ ...prod });
    console.log("Nuevo producto creado");
  };
  const handleSubmit = () => {
    addProd();
    prod = {
      name: "",
      color: "",
      price: "",
      company: "",
      size: "",
      description: "",
      imageURL: "",
    };
  };
</script>

<main>
  <div class="container">
    <div class="row">
      <div class="col-md-6" />
    </div>
    <div class="col-md-6">
      <div class="card">
        <div class="card-body">
          <form on:submit|preventDefault={handleSubmit}>
            <input
              bind:value={prod.name}
              type="text"
              placeholder="Nombre de Producto"
              id="product-name"
              class="form-control"
            />
            <input
              bind:value={prod.color}
              type="text"
              placeholder="Color de Producto"
              id="product-color"
              class="form-control"
            />
            <input
              bind:value={prod.price}
              type="number"
              placeholder="Precio de Producto"
              id="product-price"
              class="form-control"
            />
            <input
              bind:value={prod.company}
              type="text"
              placeholder="Marca de Producto"
              id="product-company"
              class="form-control"
            />
            <input
              bind:value={prod.size}
              type="text"
              placeholder="Tamaño de Producto"
              id="product-size"
              class="form-control"
            />
            <textarea
              bind:value={prod.description}
              id="product-description"
              rows="3"
              placeholder="Descripción del producto"
            />
            <input
              bind:value={prod.imageURL}
              type="url"
              id="product-image-url"
              placeholder="//carga de imagenes"
              class="form-control"
            />

            <button>Guardar Producto</button>
            <button class="btn btn-danger">Borrar</button>
            <button class="btn btn-secondary">Editar</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</main>

{#each productos as prod}
  <div>
    <h5>{prod.name}</h5>
    <h5>{prod.color}</h5>
    <h5>{prod.size}</h5>
    <h5>{prod.price}</h5>
    <h5>{prod.company}</h5>
    <h5>{prod.imageURL}</h5>
    <p>{prod.description}</p>
  </div>
{/each}

<style>
</style>
