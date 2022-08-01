import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddGameCodeInMazes extends BaseSchema {
  protected tableName = 'add_game_code_in_mazes'

  public async up () {
    this.schema.alterTable('mazes', (table) => {
      table.string("code")
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
