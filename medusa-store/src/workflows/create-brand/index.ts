import { createBrandStep } from "./steps/create-brand"
import {
    createWorkflow,
    WorkflowResponse,
  } from "@medusajs/framework/workflows-sdk"
  import { 
    emitEventStep,
  } from "@medusajs/medusa/core-flows"
  
  export type CreateBrandInput = {
    name: string
  }
  
  export const createBrandWorkflow = createWorkflow(
    "create-brand",
    (input: CreateBrandInput) => {
        const brand = createBrandStep(input)
        emitEventStep
        emitEventStep({
              eventName: "brand.created",
              data: {
                id: brand.id,
              },
            })

        return new WorkflowResponse(brand)
    }
  )