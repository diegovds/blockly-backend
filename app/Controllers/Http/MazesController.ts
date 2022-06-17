import {v4 as uuidv4} from 'uuid'

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Maze from 'App/Models/Maze'
import User from 'App/Models/User'

import Application from "@ioc:Adonis/Core/Application"

export default class MazesController {
  private validationOptions = {
    types: ["image"],
    size: '2mb',
  }

  public async store({request, response, params}: HttpContextContract) {

    const body = request.body()
    const userId = params.userId

    await User.findOrFail(userId)

    body.user_id = userId

    const image = request.file('image', this.validationOptions)

    if(image){
      const imageName = `${uuidv4()}.${image.extname}`

      await image.move(Application.tmpPath('uploads'), {
        name: imageName
      })

      body.image = imageName
    }

    const maze = await Maze.create(body)

    response.status(201)

    return{
      message: "Maze criado com sucesso!",
      data: maze,
    }

  }

  public async index() {

    const mazes = await Maze.all()

    return {
      data: mazes, 
    }
  }

  public async show({ params }: HttpContextContract) {
    
    const maze = await Maze.findOrFail(params.id)

    return {
      data:maze,
    }
  }

  public async destroy({ params }: HttpContextContract) {
    const maze = await Maze.findOrFail(params.id)

    await maze.delete()
    
    return {
      message: "Maze excluído com sucesso!",
      data:maze,
    }
  }

  public async update({params, request}: HttpContextContract) {

    const body = request.body()

    const maze = await Maze.findOrFail(params.id)

    maze.name = body.name
    maze.levels = body.levels

    if(maze.image != body.image || !maze.image){
      const image = request.file('image', this.validationOptions)

      if(image){
        const imageName = `${uuidv4()}.${image.extname}`

        await image.move(Application.tmpPath('uploads'), {
        name: imageName
      })

      maze.image = imageName
      }
    }

    await maze.save()

    return {
      message: "Maze atualizado com sucesso!",
      data: maze,
    }
  }
}
