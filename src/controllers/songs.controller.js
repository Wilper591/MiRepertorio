import { pool } from "../db.js";

/* Create Song */
const newSong = async (titulo, artista, tono) => {
  try {
    /* Inicia la transacción */
    console.log("BEGIN START");
    await pool.query("BEGIN");

    /* Query de la transacción */
    const query =
      "INSERT INTO canciones(titulo, artista, tono) VALUES($1, $2, $3) RETURNING *;";
    const values = [titulo, artista, tono];
    const result = await pool.query(query, values);

    if (!result.rowCount) {
      /* Error */
      const rollback = "ROLLBACK";
      await pool.query(rollback);
      console.log({
        status: "Error",
        message: "No se pudo crear la nueva canción.",
        code: 500,
      });
    } else {
      /* Success */
      console.log({
        status: "Success",
        message: "Registro de canción generado con éxito.",
        code: 200,
        emisor: result.rows[0],
      });
      /* Termina la transacción */
      await pool.query("COMMIT");
      console.log("COMMIT END");
      return {
        status: "Success",
        message: "Registro de canción generado con éxito.",
        code: 200,
        song: result.rows[0],
      };
    }
  } catch (error) {
    await pool.end();
    return console.log({
      message: error.message,
      code: error.code,
      detail: error.detail,
      constraint: error.constraint,
      mensajeDelProgramador: "Error al insertar canción.",
    });
  }
};

/* Read Songs */
const getSongs = async () => {
  try {
    /* Inicia la transacción */
    console.log("BEGIN START");
    await pool.query("BEGIN");
    /* Query de la transacción */
    const query = "SELECT * FROM canciones ORDER BY id ASC;";
    const result = await pool.query(query);
    if (!result.rowCount) {
      /* Error */
      const rollback = "ROLLBACK";
      await pool.query(rollback);
      console.log({
        status: "Error",
        message: "No se pudo acceder al listado de canciones.",
        code: 500,
      });
    } else {
      /* Success */
      console.log({
        status: "Success",
        message: "Listado de canciones obtenido con éxito.",
        code: 200,
        listado: result.rows,
      });
      /* Termina la transacción */
      await pool.query("COMMIT");
      console.log("COMMIT END");
      return {
        status: "Success",
        message: "Listado de canciones obtenido con éxito.",
        code: 200,
        listado: result.rows,
      };
    }
  } catch (error) {
    await pool.end();
    return console.log({
      message: error.message,
      code: error.code,
      detail: error.detail,
      constraint: error.constraint,
      mensajeDelProgramador: "Error al buscar la lista de canciones.",
    });
  }
};

/* Update Song */
const updateSong = async (id, titulo, artista, tono) => {
  try {
    /* Inicia la transacción */
    console.log("BEGIN START");
    await pool.query("BEGIN");
    /* Query de la transacción */
    const query =
      "UPDATE canciones set titulo = $2, artista = $3, tono = $4 where id = $1 RETURNING *;";
    const values = [id, titulo, artista, tono];
    const result = await pool.query(query, values);
    if (!result.rowCount) {
      /* Error */
      const rollback = "ROLLBACK";
      await pool.query(rollback);
      console.log({
        status: "Error",
        message: "No se pudo acceder al listado de canciones.",
        code: 500,
      });
    } else {
      /* Success */
      console.log({
        status: "Success",
        message: "Listado de canciones obtenido con éxito.",
        code: 200,
        update: result.rows,
      });
      /* Termina la transacción */
      await pool.query("COMMIT");
      console.log("COMMIT END");
      return {
        status: "Success",
        message: "Listado de canciones obtenido con éxito.",
        code: 200,
        update: result.rows,
      };
    }
  } catch (error) {
    await pool.end();
    return console.log({
      message: error.message,
      code: error.code,
      detail: error.detail,
      constraint: error.constraint,
      mensajeDelProgramador: "Error al actualizar canción.",
    });
  }
};

/* Delete Song */
const deleteSong = async (id) => {
  try {
    /* Inicia la transacción */
    console.log("BEGIN START");
    await pool.query("BEGIN");
    /* Query de la transacción */
    const query = "DELETE FROM canciones where id = $1 RETURNING *;";
    const values = [id];
    const result = await pool.query(query, values);

    if (!result.rowCount) {
      /* Error */
      const rollback = "ROLLBACK";
      await pool.query(rollback);
      console.log({
        status: "Error",
        message: "No se pudo eliminar la canción.",
        code: 500,
      });
    } else {
      /* Success */
      console.log({
        status: "Success",
        message: "Canción eliminada con éxito.",
        code: 200,
        deleted: result.rows,
      });
      /* Termina la transacción */
      await pool.query("COMMIT");
      console.log("COMMIT END");
      return {
        status: "Success",
        message: "Canción eliminada con éxito.",
        code: 200,
        deleted: result.rows,
      };
    }
  } catch (error) {
    await pool.end();
    return console.log({
      message: error.message,
      code: error.code,
      detail: error.detail,
      constraint: error.constraint,
      mensajeDelProgramador: "Error al eliminar la canción.",
    });
  }
};
export { newSong, getSongs, updateSong, deleteSong };
