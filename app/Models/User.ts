import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Maze from './Maze'

export default class User extends BaseModel {
  @hasMany(() => Maze)
  public mazes: HasMany<typeof Maze>

  @column({ isPrimary: true })
  public id: number

  @column()
  public username: string

  @column()
  public uid: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
