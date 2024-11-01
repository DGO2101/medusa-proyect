import {
    createStep,
    StepResponse,
  } from "@medusajs/framework/workflows-sdk"
  import { CreateBrandInput } from ".."
  import { BRAND_MODULE } from "../../../modules/brand"
  import BrandModuleService from "../../../modules/brand/service"
  
  // Step para crear una marca
  export const createBrandStep = createStep(
    "create-brand-step",
    async (input: CreateBrandInput, { container }) => {
      const brandModuleService: BrandModuleService = container.resolve(
        BRAND_MODULE
      )
  
      const brand = await brandModuleService.createBrands(input)
  
      return new StepResponse(brand, brand.id)
    }
  )
  
  // Step para eliminar una marca
  export const deleteBrandStep = createStep(
    "delete-brand-step",
    async (id: string, { container }) => {
      const brandModuleService: BrandModuleService = container.resolve(
        BRAND_MODULE
      )
      
      await brandModuleService.deleteBrands(id)
      
      return new StepResponse({
        success: true,
        id: id
      })
    }
  )