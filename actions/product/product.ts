"use server";
import { z } from "zod";
import { db } from "@/lib/db";
import {
  TAddProductFormValues,
  TCartListItemDB,
  TPath,
  TProductListItem,
  TProductRecentItem,
  TSpecification,
} from "@/types/product";
import { ProductSpec } from "@prisma/client";

const ValidateAddProduct = z.object({
  name: z.string().min(3),
  desc: z.string().optional(),
  images: z.string(),
  categoryID: z.string().min(6),
  specifications: z.array(
    z.object({
      specGroupID: z.string().min(6),
      specValues: z.array(z.string()),
    })
  ),
});

export const addProduct = async (data: TAddProductFormValues) => {
  console.log("Data received in addProduct:", data);
  
  if (!ValidateAddProduct.safeParse(data).success)
    return { error: "Проверка неверных данных еще раз!" };

  try {
    // Make sure images is a string
    const imageString = data.images || "";
    
    const result = await db.category.update({
      where: {
        id: data.categoryID,
      },
      data: {
        products: {
          create: {
            name: data.name,
            desc: data.desc || null,
            isAvailable: data.isAvailable,
            images: imageString, // Use the validated image string
            specs: data.specifications,
          },
        },
      },
    });
    
    if (!result) return { error: "Не удается вставить данные" };
    return { res: result };
  } catch (error) {
    console.error("Error in addProduct:", error);
    return { error: JSON.stringify(error) };
  }
};

export const getAllProducts = async () => {
  try {
    const result: TProductListItem[] | null = await db.product.findMany({
      select: {
        id: true,
        name: true,
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!result) return { error: "Не удается получить данные из базы данных!" };
    return { res: result };
  } catch (error) {
    return { error: JSON.stringify(error) };
  }
};

export const getOneProduct = async (productID: string) => {
  if (!productID || productID === "") return { error: "Invalid Product ID!" };

  try {
    const result = await db.product.findFirst({
      where: {
        id: productID,
      },
      select: {
        id: true,
        name: true,
        desc: true,
        images: true,
        specs: true,
        isAvailable: true,
        optionSets: true,
        category: {
          select: {
            id: true,
            parentID: true,
          },
        },
      },
    });

    if (!result) return { error: "Product not found." };

    const specifications = await generateSpecTable(result.specs);
    
    if (!specifications || specifications.length === 0) {
      console.warn(`No specifications found for product ID ${productID}`);
      return { error: "Invalid Date" };
    }

    const pathArray = await getPathByCategoryID(result.category.id, result.category.parentID);
    
    if (!pathArray || pathArray.length === 0) {
      console.warn(`No path found for category ID ${result.category.id}`);
      return { error: "Invalid Date" };
    }

    const mergedResult = { ...result, specifications, path: pathArray }; // Ensure 'path' is included
    
    return { res: mergedResult };
  } catch (error) {
    console.error("Error fetching product:", error);
    return { error: JSON.stringify(error) }; // Return error as a string
  }
};

export const getCartProducts = async (productIDs: string[]) => {
  if (!productIDs || productIDs.length === 0)
    return { error: "Invalid Product List" };

  try {
    const result: TCartListItemDB[] | null = await db.product.findMany({
      where: {
        id: { in: productIDs },
      },
      select: {
        id: true,
        name: true,
        images: true,
      },
    });

    if (!result) return { error: "Не удается получить данные из базы данных!" };
    return { res: result };
  } catch (error) {
    return { error: JSON.stringify(error) };
  }
};

export const deleteProduct = async (productID: string) => {
  if (!productID || productID === "") return { error: " Проверка неверных данных еще раз!" };
  try {
    const result = await db.product.delete({
      where: {
        id: productID,
      },
    });

    if (!result) return { error: "Не удается удалить, проверьте еще раз внимательно!" };
    return { res: result };
  } catch (error) {
    return { error: JSON.stringify(error) };
  }
};

const generateSpecTable = async (rawSpec: ProductSpec[]) => {
  try {
    const specGroupIDs = rawSpec.map((spec) => spec.specGroupID);

    // Fetch spec groups from the database
    const result = await db.specGroup.findMany({
      where: {
        id: { in: specGroupIDs },
      },
    });
    if (!result || result.length === 0) return null;

    const specifications: TSpecification[] = [];

    // Process raw specs to align them with their corresponding spec groups
    rawSpec.forEach((spec) => {
      const groupSpecIndex = result.findIndex((g) => g.id === spec.specGroupID);
      if (groupSpecIndex === -1) return;  // If no matching spec group, skip

      const tempSpecs: { name: string; value: string }[] = [];
      spec.specValues.forEach((s, index) => {
        const specName = result[groupSpecIndex].specs[index] || `Spec ${index + 1}`;
        tempSpecs.push({
          name: specName,
          value: s || "Not Provided",
        });
      });

      specifications.push({
        groupName: result[groupSpecIndex].title || "Unknown Group",
        specs: tempSpecs,
      });
    });

    if (specifications.length === 0) return null;

    return specifications;
  } catch (error) {
    console.error('Error generating spec table:', error);
    return null;
  }
};

const getPathByCategoryID = async (
  categoryID: string,
  parentID: string | null
) => {
  try {
    if (!categoryID || categoryID === "") return null;
    if (!parentID || parentID === "") return null;
    const result: TPath[] = await db.category.findMany({
      where: {
        OR: [{ id: categoryID }, { id: parentID }, { parentID: null }],
      },
      select: {
        id: true,
        parentID: true,
        name: true,
        url: true,
      },
    });
    if (!result || result.length === 0) return null;

    const path: TPath[] = [];
    let tempCatID: string | null = categoryID;
    let searchCount = 0;

    const generatePath = () => {
      const foundCatIndex = result.findIndex((cat) => cat.id === tempCatID);
      if (foundCatIndex === -1) return;
      path.unshift(result[foundCatIndex]);
      tempCatID = result[foundCatIndex].parentID;
      if (!tempCatID) return;
      searchCount++;
      if (searchCount <= 3) generatePath();
      return;
    };
    generatePath();

    if (!path || path.length === 0) return null;
    return path;
  } catch (error) {
    return null;
  }
};

export const getRecentProducts = async () => {
  try {
    // Fetch the most recent products, sorted by the 'createdAt' field
    const result: TProductRecentItem[] | null = await db.product.findMany({
      orderBy: {
        createdAt: 'desc', 
      },
      take: 100, 
      select: {
        id: true,
        name: true,
        isAvailable: true,
       
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        images: true,
      },
    });

    if (!result) return { error: "Не удается получить данные из базы данных!" };
    return { res: result };
  } catch (error) {
    return { error: JSON.stringify(error) };
  }
};


export const updateProduct = async (productID: string, data: TAddProductFormValues) => {
  if (!productID || productID === "") 
    return { error: "Invalid Product ID!" };
    
  if (!ValidateAddProduct.safeParse(data).success)
    return { error: "Проверка неверных данных еще раз!" };

  try {
    // First get the product to ensure it exists and get the current categoryID
    const existingProduct = await db.product.findUnique({
      where: { id: productID },
      select: { categoryID: true }
    });

    if (!existingProduct) {
      return { error: "Product not found." };
    }

    // If the category is changing, we need to handle it differently
    if (existingProduct.categoryID !== data.categoryID) {
      // First update the product with the new category
      const result = await db.product.update({
        where: { id: productID },
        data: {
          name: data.name,
          desc: data.desc || null,
          isAvailable: data.isAvailable,
          images: data.images,
          specs: data.specifications,
          category: {
            connect: { id: data.categoryID }
          }
        }
      });
      
      if (!result) return { error: "Не удается обновить данные" };
      return { res: result };
    } else {
      // If category isn't changing, simply update the product
      const result = await db.product.update({
        where: { id: productID },
        data: {
          name: data.name,
          desc: data.desc || null,
          isAvailable: data.isAvailable,
          images: data.images,
          specs: data.specifications,
        }
      });
      
      if (!result) return { error: "Не удается обновить данные" };
      return { res: result };
    }
  } catch (error) {
    console.error("Error updating product:", error);
    return { error: JSON.stringify(error) };
  }
};



export const getRelatedProducts = async (productID: string, categoryID: string) => {
  if (!productID || !categoryID) {
    return { error: "Invalid product or category ID" };
  }

  try {
    // First, get the current product's category details
    const category = await db.category.findUnique({
      where: { id: categoryID },
      select: {
        id: true,
        parentID: true
      }
    });

    if (!category) {
      return { error: "Category not found" };
    }

    // Determine which category ID to use for finding related products
    // If the current category has few products, we'll use the parent category
    const productsInCategory = await db.product.count({
      where: { categoryID: category.id }
    });

    // Use parent category if current category has less than 5 products (excluding current product)
    const targetCategoryID = productsInCategory <= 5 && category.parentID 
      ? category.parentID 
      : category.id;

    // Fetch related products from the same category (or parent category if needed)
    const relatedProducts: TProductRecentItem[] = await db.product.findMany({
      where: {
        categoryID: targetCategoryID,
        id: { not: productID }, // Exclude the current product
        isAvailable: true       // Only show available products
      },
      take: 8, // Limit to 8 related products
      select: {
        id: true,
        name: true,
        isAvailable: true,
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        images: true,
      },
    });

    if (!relatedProducts || relatedProducts.length === 0) {
      // If no related products found in the target category,
      // fetch products from any category as fallback
      const fallbackProducts: TProductRecentItem[] = await db.product.findMany({
        where: {
          id: { not: productID },
          isAvailable: true
        },
        take: 8,
        orderBy: {
          createdAt: 'desc' // Get the newest products as fallback
        },
        select: {
          id: true,
          name: true,
          isAvailable: true,
          category: {
            select: {
              id: true,
              name: true,
            },
          },
          images: true,
        },
      });

      return { res: fallbackProducts };
    }

    return { res: relatedProducts };
  } catch (error) {
    console.error("Error fetching related products:", error);
    return { error: JSON.stringify(error) };
  }
};