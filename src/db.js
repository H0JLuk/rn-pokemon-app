import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('post.db')

export class DB {
  static init() {
    const sqlStatements = [
      'CREATE TABLE IF NOT EXISTS pokemons (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, url TEXT NOT NULL, img TEXT NOT NULL)',
      'CREATE TABLE IF NOT EXISTS abilities (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, description TEXT)',
      'CREATE TABLE IF NOT EXISTS pokemons_abilities (id INTEGER PRIMARY KEY NOT NULL, pokemon_id INTEGER NOT NULL, ability_id INTEGER NOT NULL, FOREIGN KEY (pokemon_id) REFERENCES pokemons(id), FOREIGN KEY (ability_id) REFERENCES abilities(id))',
    ]

    return new Promise((resolve, reject) => {
      db.transaction((tx) =>
        tx.executeSql(
          sqlStatements[0],
          [],
          () =>
            tx.executeSql(
              sqlStatements[1],
              [],
              () => tx.executeSql(sqlStatements[2], [], resolve, (_, err) => reject(err)),
              (_, err) => reject(err)
            ),
          (_, err) => reject(err)
        )
      )
    })
  }

  static getPokemon(name) {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM pokemons WHERE name = ?',
          [name],
          (_, result) => resolve(result.rows._array),
          (_, err) => reject(err)
        )
      })
    })
  }

  static addPokemon({ id, name, url, img }) {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO pokemons (id, name, url, img) VALUES (?, ?, ?, ?)',
          [id, name, url, img],
          (_, result) => resolve(result.insertId),
          (_, err) => reject(err)
        )
      })
    })
  }

  static getPokemonAbilities(pokemonId) {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `SELECT abilities.id AS id, abilities.name AS name, abilities.description AS description 
           FROM pokemons_abilities 
           WHERE pokemon_id = ?
           LEFT JOIN pokemons_abilities ON pokemons_abilities.ability_id = abilities.id`,
          [pokemonId],
          (_, result) => resolve(result.rows._array),
          (_, err) => reject(err)
        )
      })
    })
  }

  static addAbilitiesAndBindWithPokemon(pokemonId, abilities) {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        const abilitiesId = abilities.map(({ id }) => id)
        const sqlValues = new Array(abilities.length * 2).map((_, idx) => (idx % 2 ? abilitiesId[idx / 2] : pokemonId))
        const sqlQuery =
          'INSERT INTO pokemons_abilities (ability_id, pokemon_id) VALUES ' +
          new Array(abilities.length).map((i) => `(?, ?)`.join(', '))

        tx.executeSql(
          sqlQuery,
          sqlValues,
          () => {
            tx.executeSql('', [], (_, result) => resolve(result.rows._array), reject)
          },
          (_, err) => reject(err)
        )
      })
    })
  }

  // static updatePost({ id, booked }) {
  //   return new Promise((resolve, reject) => {
  //     db.transaction((tx) => {
  //       const sqlStatement = `UPDATE posts SET booked = ? WHERE id = ?`
  //       const args = [booked, id]

  //       tx.executeSql(sqlStatement, args, resolve, (_, err) => reject(err))
  //     })
  //   })
  // }
}
