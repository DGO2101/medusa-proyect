import { createProductsWorkflow } from "@medusajs/medusa/core-flows"
import { StepResponse } from "@medusajs/framework/workflows-sdk"
import { Modules, ContainerRegistrationKeys } from "@medusajs/framework/utils"
import { BRAND_MODULE } from "../../../modules/brand"
import BrandModuleService from "../../../modules/brand/service"

createProductsWorkflow.hooks.productsCreated(
  // Primer parámetro - función para crear links
  (async ({ products, additional_data }, { container }) => {
    if (!additional_data?.brand_id) {
      return new StepResponse([], [])
    }

    const brandModuleService: BrandModuleService = container.resolve(
      BRAND_MODULE
    )
    await brandModuleService.retrieveBrand(additional_data.brand_id as string)

    const remoteLink = container.resolve(
      ContainerRegistrationKeys.REMOTE_LINK
    )
    const logger = container.resolve(
      ContainerRegistrationKeys.LOGGER
    )

    const links = []

    for (const product of products) {
      links.push({
        [Modules.PRODUCT]: {
          product_id: product.id,
        },
        [BRAND_MODULE]: {
          brand_id: additional_data.brand_id,
        },
      })
    }
    
    await remoteLink.create(links)

    logger.info("Linked brand to products")

    return new StepResponse(links, links)
  }),
  // Segundo parámetro - función para eliminar links
  async (links, { container }) => {
    if (!links.length) {
      return
    }

    const remoteLink = container.resolve(
      ContainerRegistrationKeys.REMOTE_LINK
    )
    const logger = container.resolve(
      ContainerRegistrationKeys.LOGGER
    )

    await remoteLink.dismiss(links)
    
    logger.info("Removed brand-product links")
  }
)