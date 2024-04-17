let url = "https://mirepertorio.onrender.com/apiV1/cancion";
let tbody = document.getElementById("cuerpo");
let id = document.getElementById("idSong");
let cancion = document.getElementById("cancion");
let artista = document.getElementById("artista");
let tono = document.getElementById("tono");

let canciones = [];
window.onload = getData();

async function getData() {
  await axios.get(url + "/getSongs").then((data) => {
    canciones = data.data;
    tbody.innerHTML = "";
    canciones.listado.forEach((c, i) => {
      tbody.innerHTML += `
        <tr>
          <td>${i + 1}</td>
          <td>${c.titulo}</td>
          <td>${c.artista}</td>
          <td>${c.tono}</td>
          <td>
            <button class="btn btn-warning" onclick="prepararCancion(${i},'${
        c.id
      }')">Editar</button>
            <button class="btn btn-danger" onclick="eliminarCancion(${i},'${
        c.id
      }')">Eliminar</button>
          </td>
        </tr>
      `;
    });
  });
  cancion.value = "";
  artista.value = "";
  tono.value = "";
}

function nuevaCancion() {
  cancion;
  artista;
  tono;
  let data = {
    titulo: cancion.value,
    artista: artista.value,
    tono: tono.value,
  };
  const regexCancion = /^[A-Za-zñÑ\sáíéóúÁÍÉÓÚäÄëËïÏöÖüÜ\d]+$/;
  const regexArtista = /^[A-Za-zñÑ\sáíéóúÁÍÉÓÚäÄëËïÏöÖüÜ]+$/;
  const regexTono = /^(do|re|mi|fa|sol|la|si)$/i;

  if (!regexCancion.test(data.titulo)) {
    alert("El nombre de la canción solo puede contener letras");
    return;
  }
  if (!regexArtista.test(data.artista)) {
    alert("El nombre del artista solo puede contener letras");
    return;
  }
  if (!regexTono.test(data.tono)) {
    alert("El tono ingresado no existe");
    return;
  }
  axios.post(url + "/newSong", data).then(() => getData());
}

function eliminarCancion(i, id) {
  axios.delete(url + "/deleteSong" + "?id=" + id).then(() => {
    alert("Canción " + canciones.listado[i].titulo + " eliminada");
    getData();
  });
}

function prepararCancion(i, id) {
  cancion.value = canciones.listado[i].titulo;
  artista.value = canciones.listado[i].artista;
  tono.value = canciones.listado[i].tono;
  document
    .getElementById("editar")
    .setAttribute("onclick", `editarCancion('${id}')`);
  document.getElementById("agregar").style.display = "none";
  document.getElementById("editar").style.display = "block";
}

function editarCancion(id) {
  let data = {
    titulo: cancion.value,
    artista: artista.value,
    tono: tono.value,
  };
  const regexCancion = /^[A-Za-zñÑ\sáíéóúÁÍÉÓÚäÄëËïÏöÖüÜ\d]+$/;
  const regexArtista = /^[A-Za-zñÑ\sáíéóúÁÍÉÓÚäÄëËïÏöÖüÜ]+$/;
  const regexTono = /^(do|re|mi|fa|sol|la|si)$/i;

  if (!regexCancion.test(data.titulo)) {
    alert("El nombre de la canción solo puede contener letras");
    return;
  }
  if (!regexArtista.test(data.artista)) {
    alert("El nombre del artista solo puede contener letras");
    return;
  }
  if (!regexTono.test(data.tono)) {
    alert("El tono ingresado no existe");
    return;
  }
  axios.put(url + `/updateSong/${id}`, data).then(() => {
    getData();
    document.getElementById("agregar").style.display = "block";
    document.getElementById("editar").style.display = "none";
  });
}
