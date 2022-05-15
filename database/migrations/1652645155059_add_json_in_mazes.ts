import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddJsonInMazes extends BaseSchema {
  protected tableName = 'add_json_in_mazes'

  public async up () {
    this.schema.alterTable ('mazes', (table) => {
      table.json('levels').notNullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
