import {
    MedusaRequest,
    MedusaResponse,
  } from "@medusajs/framework/http"
  import { 
    CreateBrandInput, 
    createBrandWorkflow,
  } from "../../../workflows/create-brand"
  
  export const POST = async (
    req: MedusaRequest<CreateBrandInput>,
    res: MedusaResponse
  ) => {
    const { result } = await createBrandWorkflow(req.scope)
      .run({
        input: req.body,
      })
  
    res.json({ brand: result })
  }