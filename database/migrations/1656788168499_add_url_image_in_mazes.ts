import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddUrlImageInMazes extends BaseSchema {
  protected tableName = 'add_url_image_in_mazes'

  public async up () {
    this.schema.alterTable('mazes', (table) => {
      table.string("url_image")
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
