import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class DropJsonInMazes extends BaseSchema {
  protected tableName = 'drop_json_in_mazes'

  public async up () {
    this.schema.alterTable ('mazes', (table) => {
      table.dropColumn('levels')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
