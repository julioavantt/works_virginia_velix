const SUPABASE_URL = "https://qczamcftbautunvijrit.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_VhP3ax92ZTVSodrXqmHxkg_5t4T4or_";

const { createClient } = supabase;
const db = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function acotarTexto(texto, maxCaracteres = 200) {
 if (texto.length > maxCaracteres) {
  return texto.slice(0, maxCaracteres) + "...";
 }
 return texto;
}

async function cargar() {
 const { data, error } = await db.from("contenidos").select("*");

 if (error) {
  console.error(error);
  return;
 }

 const destacado = document.querySelector("#destacado");

 destacado.querySelector("img").src = data[0].imagen;
 destacado.querySelector("h1").textContent = data[0].titulo;
 destacado.querySelector("p").textContent = acotarTexto(data[0].descripcion);
 destacado.querySelector("#precio").textContent =
  `$${data[0].precio.toLocaleString("es-AR")}`;
 destacado.querySelector("#bait").textContent = acotarTexto(
  data[0].frase_gancho,
 );
 console.table(data);
 /* const lista = document.getElementById("lista");
    data.forEach((p) => {
     const li = document.createElement("li");
     li.textContent = p.titulo;
     lista.appendChild(li);
    }); */
}

cargar();
