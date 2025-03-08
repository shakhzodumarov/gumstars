"use server";
import { db } from "@/lib/db";
import { SpecGroup } from "@prisma/client"; // Import SpecGroup from Prisma

// Define the type for the specGroup inside Category_SpecGroup
interface CategorySpecGroup {
  specGroup: SpecGroup;
}

export const getCategorySpecs = async (categoryID: string) => {
  if (!categoryID || categoryID === "") return { error: "Invalid Category ID" };

  const specifications: SpecGroup[] = []; // Array to store the specifications
  let shouldRepeat = true; // Flag to control the loop
  let catIdToSearch: string | null = categoryID; // The category ID to search for, starts with the provided categoryID

  // Function to fetch specs and parent ID based on categoryID
  const getSpecsAndParentID = async (catID: string) => {
    const result = await db.category.findFirst({
      where: {
        id: catID,
      },
      select: {
        parentID: true, // Selecting the parentID
        Category_SpecGroup: { // Selecting the Category_SpecGroup relation
          select: {
            specGroup: { // Selecting the specGroup details (id, title, specs)
              select: {
                id: true,
                title: true,
                specs: true, // Assuming specs is an array of strings or some similar type
              },
            },
          },
        },
      },
    });
    return result;
  };

  // Function to process the Category_SpecGroup and update specifications
  const getSpecGroup = async () => {
    if (catIdToSearch) {
      const result = await getSpecsAndParentID(catIdToSearch);
      if (!result) return false; // If no result found, stop the loop

      // Check if Category_SpecGroup contains any data
      if (result.Category_SpecGroup.length > 0) {
        // Iterate through Category_SpecGroup and add specGroup to specifications array
        result.Category_SpecGroup.forEach((categorySpecGroup: CategorySpecGroup) =>
          specifications.unshift(categorySpecGroup.specGroup) // Unshift specGroup into specifications
        );
      }

      // If there's no parentID, stop the loop
      if (!result.parentID) return false;

      // Update catIdToSearch to the parentID and repeat the process
      catIdToSearch = result.parentID;
      return true;
    }
    return false;
  };

  try {
    // Continue fetching specs and parent IDs until no more parentID exists
    do {
      shouldRepeat = await getSpecGroup();
    } while (shouldRepeat);

    // Return the specifications gathered
    return { res: specifications };
  } catch (error) {
    // Catch and return any error that occurs during the process
    return { error: JSON.stringify(error) };
  }
};
