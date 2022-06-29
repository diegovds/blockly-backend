import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddConclusionsInMazes extends BaseSchema {
  protected tableName = 'add_conclusions_in_mazes'

  public async up () {
    this.schema.alterTable('mazes', (table) => {
      table.integer("conclusions")
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
