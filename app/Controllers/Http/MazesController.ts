import {v4 as uuidv4} from 'uuid'
const Generator = require("license-key-generator");

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Drive from '@ioc:Adonis/Core/Drive'

import Maze from 'App/Models/Maze'
import User from 'App/Models/User'

//import Application from "@ioc:Adonis/Core/Application"

export default class MazesController {
  private validationOptions = {
    types: ["image"],
    size: '2mb',
  }

  public async store({request, response, params}: HttpContextContract) {

    const body = request.body()
    const userId = params.userId

    const user = await User.findOrFail(userId)

    body.username = user.username
    body.user_id = userId
    body.executions = 0
    body.conclusions = 0

    const options = {
      type: "random", // default "random"
      length: 6, // default 16
      group: 1, // default 4
      split: "-", // default "-"
      splitStatus: false // default true
    }
    const code = new Generator(options);
    code.get((error: any,code: any)=>{
        if(error) return console.error(error)
        //console.log("code=",code);
        body.code = code
    })

    const image = request.file('image', this.validationOptions)

    if(image){
      const imageName = `${uuidv4()}.${image.extname}`

      /*
      await image.move(Application.tmpPath('uploads'), {
        name: imageName
      })
      */
     try {
      await image.moveToDisk('./', {name: imageName})
      const urlImage = await Drive.getUrl(imageName)

      body.url_image = urlImage

     } catch (error) {
      console.log(error)
     }

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

    const mazes = await Maze.query().orderBy('created_at', 'desc')

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

    await Drive.delete(maze.image)
    await maze.delete()
    
    return {
      message: "Maze excluído com sucesso!",
      data:maze,
    }
  }

  public async update({params, request}: HttpContextContract) {

    const body = request.body()

    const maze = await Maze.findOrFail(params.id)

    maze.username = body.username
    maze.name = body.name
    maze.levels = body.levels
    maze.createdAt = body.createdAt
    maze.executions = body.executions
    maze.conclusions = body.conclusions

    if(maze.code == null){
      const options = {
        type: "random", // default "random"
        length: 6, // default 16
        group: 1, // default 4
        split: "-", // default "-"
        splitStatus: false // default true
      }
      const code = new Generator(options);
      code.get((error: any,code: any)=>{
          if(error) return console.error(error)
          //console.log("code=",code);
          maze.code = code
      }) 
    }

    if(maze.image != body.image || !maze.image){
      const image = request.file('image', this.validationOptions)

      if(image){
        const imageName = `${uuidv4()}.${image.extname}`

        /*await image.move(Application.tmpPath('uploads'), {
        name: imageName
      })*/
        
        await Drive.delete(maze.image)

        try {
          await image.moveToDisk('./', {name: imageName})
          const urlImage = await Drive.getUrl(imageName)
    
          maze.url_image = urlImage
    
        } catch (error) {
          console.log(error)
        }

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
