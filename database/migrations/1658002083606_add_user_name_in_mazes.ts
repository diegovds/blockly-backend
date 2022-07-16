import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddUserNameInMazes extends BaseSchema {
  protected tableName = 'add_user_name_in_mazes'

  public async up () {
    this.schema.alterTable('mazes', (table) => {
      table.string("username")
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
