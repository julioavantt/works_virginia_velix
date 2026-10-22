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

 const item_destacado = data.filter((d) => d.destacado === true).reverse();

 destacado.querySelector("img").src = item_destacado[0].imagen;
 destacado.querySelector("h1").textContent = item_destacado[0].titulo;
 destacado.querySelector("p").textContent = acotarTexto(
  item_destacado[0].descripcion,
 );
 destacado.querySelector("#precio").textContent =
  `$${item_destacado[0].precio.toLocaleString("es-AR")}`;
 destacado.querySelector("#bait").textContent = acotarTexto(
  item_destacado[0].frase_gancho,
 );

 const lista = document.getElementById("lista");
 data.forEach((d) => {
  let card = `<div
     class="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-pink-500/50 transition duration-300 glow-effect flex flex-col"
    >
     <div class="relative h-60 overflow-hidden bg-slate-950">
      <span
       class="absolute top-3 left-3 z-10 bg-purple-600 text-white font-black text-xs px-3 py-1 rounded-full uppercase shadow-lg"
      >
       ${d.frase_gancho}
      </span>
      <img
       src="${d.imagen}"
       alt="Smartwatch Sport V2"
       class="w-full h-full object-cover hover:scale-105 transition duration-500"
      />
     </div>
     <div class="p-6 flex-1 flex flex-col justify-between">
      <div>
       <h3 class="font-bold text-xl mb-2 text-slate-100">
        ${d.titulo}
       </h3>
       <p class="text-slate-400 text-sm mb-4">
        ${d.descripcion}
       </p>
      </div>
      <div>
       <div class="flex items-baseline space-x-2 mb-4">
        <span class="text-2xl font-black text-pink-400">$${d.precio.toLocaleString("es-AR")}</span>
        <span class="text-sm text-slate-500 line-through">$32.000</span>
       </div>
       <a
        href="https://wa.me/5491100000000?text=Hola!%20Quiero%20comprar%20el%20Smartwatch%20Sport%20V2"
        target="_blank"
        class="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2"
       >
        <i class="fab fa-whatsapp text-lg"></i>
        <span>Pedir por WhatsApp</span>
       </a>
      </div>
     </div>
    </div>
`;

  lista.insertAdjacentHTML("beforeend", card);
 });
}

cargar();
