import { createBrandStep } from "./steps/create-brand"
import {
    createWorkflow,
    WorkflowResponse,
  } from "@medusajs/framework/workflows-sdk"
  
  export type CreateBrandInput = {
    name: string
  }
  
  export const createBrandWorkflow = createWorkflow(
    "create-brand",
    (input: CreateBrandInput) => {
        const brand = createBrandStep(input)

        return new WorkflowResponse(brand)
    }
  )