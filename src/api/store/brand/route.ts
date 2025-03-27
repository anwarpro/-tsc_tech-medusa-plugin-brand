import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import { BRAND_MODULE } from "../../../modules/brand";
import BrandModuleService from "../../../modules/brand/service";

type PostAdminCreateBrandType = {
  name: string;
};

export const POST = async (
  req: MedusaRequest<PostAdminCreateBrandType>,
  res: MedusaResponse
) => {
  const brandModuleService: BrandModuleService =
    req.scope.resolve(BRAND_MODULE);

  const brand = await brandModuleService.createBrands(req.body);
  res.send({ brand });
};

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const query = req.scope.resolve("query");

  const { data: brands } = await query.graph({
    entity: "brand",
    fields: ["*", "products.*"],
  });
  const { data: products } = await query.graph({
    entity: "product",
    fields: ["*", "brand.*"],
  });

  res.send({ brands });
};
