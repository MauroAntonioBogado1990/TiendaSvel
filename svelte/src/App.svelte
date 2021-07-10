<script>
  import { db } from "./firebase";

  let prod = {
    name: "",
    color: "",
    price: "",
    company: "",
    size: "",
    description: "",
  };
  let productos = [];
  let editStatus = false;
  let currentId;

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
    if (!editStatus) {
      addProd();
    } else {
      updateProd();
    }

    prod = {
      name: "",
      color: "",
      price: "",
      company: "",
      size: "",
      description: "",
    };
  };
  const deleteProd = async (id) => {
    await db.collection("productos").doc(id).delete();
  };
  const editProd = (currentProd) => {
    editStatus = true;
    prod.name = currentProd.name;
    prod.color = currentProd.color;
    prod.price = currentProd.price;
    prod.company = currentProd.company;
    prod.size = currentProd.size;
    prod.description = currentProd.description;
    currentId = currentProd.id;
  };
  const onCancel = () => {
    editStatus = false;
    prod = {
      name: "",
      color: "",
      price: "",
      company: "",
      size: "",
      description: "",
    };
  };
  const updateProd = async () => {
    await db.collection("productos").doc(currentId).update(prod);
  };
</script>

<main>
  <div class="container">
    <div class="row">
      <div class="col-md-6" />
    </div>
    <div class="col-md-6">
      <div class="card">
        <div class=" card card-body">
          <form on:submit|preventDefault={handleSubmit} class="form-control">
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
              class="form-control"
            />
            <button class="btn btn-primary">
              {#if !editStatus} Guardar {:else} Actualizar {/if}</button
            >
            {#if editStatus}
              <button class="btn btn-info" on:click={onCancel}>Cancelar</button>
            {/if}
          </form>
        </div>
      </div>
    </div>
  </div>
</main>

{#each productos as prod}
  <div class="card card-body mt-2 ">
    <h5 style="text-align: center;">{prod.name}</h5>
    <h5 style="text-align: center;">{prod.color}</h5>
    <h5 style="text-align: center;">{prod.size}</h5>
    <h5 style="text-align: center;">{prod.price}</h5>
    <h5 style="text-align: center;">{prod.company}</h5>
    <p style="text-align: center;">{prod.description}</p>
    <button class="btn btn-danger" on:click={deleteProd(prod.id)}>
      Borrar
    </button>
    <button class="btn btn-primary" on:click={editProd(prod)}>Editar</button>
  </div>
{/each}

<style>
</style>
