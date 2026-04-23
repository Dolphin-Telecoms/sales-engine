import OddoAxios from "@/src/libs/Oddo";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { homeCategory } = await req.json();
    let response = await OddoAxios.post(
      `/json/2/product.category/search_read`,
      {
        domain: [["parent_id.id", "=", homeCategory]],
        limit: 20,
      },
    ).then((res) => res.data);

    response = response.filter(
      (item: any) => !item?.name?.toLocaleLowerCase().includes("equipment"),
    );

    if (response) {
      const categoriesIds = response.map((category: any) => category.id);

      // ✅ fetch products per category
      const productsResponse = await Promise.allSettled(
        categoriesIds.map((id: number) =>
          OddoAxios.post(`/json/2/product.template/search_read`, {
            domain: [["categ_id", "=", id]], // simpler + correct
          }),
        ),
      ).then(
        (results) =>
          results
            .map((r) => (r.status === "fulfilled" ? r.value.data : []))
            .flat(), // ✅ flatten all product arrays
      );

      response = await Promise.all(
        response.map(async (category: any) => {
          const products = productsResponse.filter(
            (product: any) => product?.categ_id?.[0] === category.id,
          );

          const productAttributes = await Promise.all(
            products.map(async (product: any) => {
              const attributeIds =
                product.valid_product_template_attribute_line_ids;

              if (!attributeIds || attributeIds.length === 0) {
                return { ...product, attributes: [] };
              }

              // ✅ Step 1: Fetch attribute lines
              const attributes = await OddoAxios.post(
                `/json/2/product.template.attribute.line/search_read`,
                {
                  domain: [["id", "in", attributeIds]],
                },
              ).then((res) => res.data);

              // ✅ Step 2: Fetch values for each attribute
              const enrichedAttributes = await Promise.all(
                attributes.map(async (attr: any) => {
                  if (!attr.value_ids || attr.value_ids.length === 0) {
                    return { ...attr, values: [] };
                  }

                  const values = await OddoAxios.post(
                    `/json/2/product.attribute.value/search_read`,
                    {
                      domain: [["id", "in", attr.value_ids]],
                    },
                  ).then((res) => res.data);

                  return {
                    ...attr,
                    values, // 👈 attach here
                  };
                }),
              );

              return {
                ...product,
                attributes: enrichedAttributes,
              };
            }),
          );

          return {
            ...category,
            products: productAttributes,
          };
        }),
      );
    }
    if (response) {
      return NextResponse.json(
        {
          message: "Oddo product home categories fetch successful",
          data: response.sort((a: any, b: any) => a.id - b.id),
        },
        { status: 200 },
      );
    } else {
      return NextResponse.json(
        {
          message: "Oddo product home categories fetch failed",
          data: response,
        },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("Error in Oddo product home categories API route:", error);
    return NextResponse.json(
      { message: "Something went wrong", data: null },
      { status: 500 },
    );
  }
}
