import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddExecutionsInMazes extends BaseSchema {
  protected tableName = 'add_executions_in_mazes'

  public async up () {
    this.schema.alterTable('mazes', (table) => {
      table.integer("executions")
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
