import { Client, Databases, ID, Query } from "appwrite";

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

console.log("Appwrite config:", {
  PROJECT_ID: !!PROJECT_ID,
  ENDPOINT: !!ENDPOINT,
  DATABASE_ID: !!DATABASE_ID,
  COLLECTION_ID: !!COLLECTION_ID
});

const client = new Client().setEndpoint(ENDPOINT).setProject(PROJECT_ID);

const database = new Databases(client);

export const updateSearchCount = async (searchTerm, movie) => {
  console.log("updateSearchCount called with:", { searchTerm, movie });
  
  // 1. Use Appwrite SDK to check if the search term exists in the database
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("searchTerm", searchTerm),
    ]);
    
    // 2. If it does, update the count
    if (result.documents.length > 0) {
      const doc = result.documents[0];
      console.log("Updating existing search term, new count:", doc.count + 1);
      await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
        count: doc.count + 1,
      });
    } else {
      // 3. If it doesn't, create a new document with the search term and count as 1
      console.log("Creating new search term entry");
      const newDoc = {
        searchTerm,
        count: 1,
        movie_id: movie.id,
        title: movie.title,
        poster_url: movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : null,
      };
      console.log("New document data:", newDoc);
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), newDoc);
    }
    console.log("Search count update completed successfully");
  } catch (error) {
    console.error("Error updating search count:", error);
  }
};

export const getTrendingMovies = async () => {
  try {
    const res = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.orderDesc("count"),
      Query.limit(5),
    ]);
    return res.documents;
  } catch (error) {
    console.log(error);
  }
};
