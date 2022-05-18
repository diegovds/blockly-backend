import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddJsonInMazesNulls extends BaseSchema {
  protected tableName = 'add_json_in_mazes_nulls'

  public async up () {
    this.schema.alterTable ('mazes', (table) => {
      table.json('levels')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
