import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { apiKey } from "../utils/API";
import Content from "./Content";

const storedResults = JSON.parse(window.sessionStorage.getItem("cached"));
export default function Browse() {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [cachedRecipes, setCachedRecipes] = useState(storedResults || {});

  useEffect(() => {
    const fetchRecipes = async (page) => {
      try {
        if (cachedRecipes[page]) {
          // Use cached recipes if available
          setRecipes(cachedRecipes[page]);
        } else {
          const response = await fetch(
            `https://api.spoonacular.com/recipes/random?number=10&apiKey=${apiKey}`
          );
          const data = await response.json();
          setRecipes(data.recipes);
          // Cache the recipes for this page
          setCachedRecipes({ ...cachedRecipes, [page]: data.recipes });
          window.sessionStorage.setItem(cachedRecipes);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecipes(currentPage);
  }, [currentPage, cachedRecipes]);
  return (
    <Container className="my-3">
      <h1 className="text-center">Browse recipes</h1>
      <div className="flex justify-content-center">
        <div className="d-flex justify-content-between">
          <Button
            variant="success"
            disabled={currentPage <= 1}
            onClick={() => {
              setCurrentPage(currentPage - 1);
            }}
          >
            Prev
          </Button>
          <Button
            variant="success"
            disabled={currentPage > 3}
            onClick={() => {
              setCurrentPage(currentPage + 1);
            }}
          >
            Next
          </Button>
        </div>
      </div>
      <Content results={recipes} />
    </Container>
  );
}
