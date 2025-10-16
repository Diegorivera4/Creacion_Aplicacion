// Obtener elementos
const tareaInput = document.getElementById("tareaInput");
const agregarBtn = document.getElementById("agregarBtn");
const listaTareas = document.getElementById("listaTareas");

// Cargar tareas del almacenamiento local
let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

// Mostrar tareas al inicio
mostrarTareas();

// Agregar nueva tarea
agregarBtn.addEventListener("click", () => {
  const texto = tareaInput.value.trim();
  if (texto === "") return alert("Escribe una tarea primero");

  tareas.push({ texto, hecho: false });
  guardarTareas();
  mostrarTareas();
  tareaInput.value = "";
});

// Mostrar tareas
function mostrarTareas() {
  listaTareas.innerHTML = "";
  tareas.forEach((tarea, index) => {
    const li = document.createElement("li");
    if (tarea.hecho) li.classList.add("hecho");

    const texto = document.createElement("span");
    texto.textContent = tarea.texto;

    const acciones = document.createElement("div");

    // ✅ Botón Hecho
    const hechoBtn = document.createElement("button");
    hechoBtn.textContent = "✅";
    hechoBtn.classList.add("hecho");

    // ✏️ Botón Editar
    const editarBtn = document.createElement("button");
    editarBtn.textContent = "✏️";
    editarBtn.classList.add("editar");

    // 🗑️ Botón Eliminar
    const eliminarBtn = document.createElement("button");
    eliminarBtn.textContent = "🗑️";
    eliminarBtn.classList.add("eliminar");

    // --- Lógica condicional ---
    if (tarea.hecho) {
      // Si está hecha, solo dejar eliminar
      hechoBtn.disabled = true;
      editarBtn.disabled = true;
      hechoBtn.style.opacity = "0.5";
      editarBtn.style.opacity = "0.5";
    } else {
      // Si no está hecha, permitir interacción
      hechoBtn.onclick = () => marcarHecho(index);
      editarBtn.onclick = () => editarTarea(index);
    }

    eliminarBtn.onclick = () => eliminarTarea(index);

    acciones.appendChild(hechoBtn);
    acciones.appendChild(editarBtn);
    acciones.appendChild(eliminarBtn);

    li.appendChild(texto);
    li.appendChild(acciones);
    listaTareas.appendChild(li);
  });
}

// Marcar como hecho o pendiente
function marcarHecho(index) {
  tareas[index].hecho = !tareas[index].hecho;
  guardarTareas();
  mostrarTareas();
}

// Editar tarea (solo si no está hecha)
function editarTarea(index) {
  if (tareas[index].hecho) {
    alert("No puedes editar una tarea que ya está marcada como hecha.");
    return;
  }

  const nuevoTexto = prompt("Editar tarea:", tareas[index].texto);
  if (nuevoTexto && nuevoTexto.trim() !== "") {
    tareas[index].texto = nuevoTexto.trim();
    guardarTareas();
    mostrarTareas();
  }
}

// Eliminar tarea
function eliminarTarea(index) {
  if (confirm("¿Eliminar esta tarea?")) {
    tareas.splice(index, 1);
    guardarTareas();
    mostrarTareas();
  }
}

// Guardar tareas
function guardarTareas() {
  localStorage.setItem("tareas", JSON.stringify(tareas));
}