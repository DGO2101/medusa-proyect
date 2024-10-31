//se hace una prueba sobre como crear una api-route
import type {
    MedusaRequest,
    MedusaResponse,
  } from "@medusajs/framework/http"
  
  export const GET = (
    req: MedusaRequest,
    res: MedusaResponse
  ) => {
    res.json({
      message: "Hello, world!",
    })
  }