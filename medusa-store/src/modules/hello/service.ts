import { MedusaService } from "@medusajs/framework/utils"
import MyCustom from "../hello/models/my-costum"

class HelloModuleService extends MedusaService({
  MyCustom,
}){
}

export default HelloModuleService
//entiendo que crea un CRUD con la informacion que se le pasa de "my-costum"