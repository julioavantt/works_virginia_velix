const SUPABASE_URL = "https://qczamcftbautunvijrit.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_VhP3ax92ZTVSodrXqmHxkg_5t4T4or_";

const db = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.getElementById("formulario").addEventListener("submit", async (e) => {
 e.preventDefault();
 const nuevo = {
  titulo: document.getElementById("titulo").value,
  descripcion: document.getElementById("descripcion").value,
  precio: document.getElementById("precio").value,
  destacado: document.getElementById("destacado").value,
  frase_gancho: document.getElementById("frase_gancho").value,
  imagen: document.getElementById("imagen").value,
 };
 const { error } = await db.from("contenidos").insert([nuevo]);
 const mensaje = document.getElementById("mensaje");
 if (error) {
  console.error(error);
  mensaje.textContent = "Error: " + error.message;
 } else {
  mensaje.textContent = "Guardado correctamente";
  e.target.reset();
 }
});
