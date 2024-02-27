import { useContext, useState } from "react";
import { Card } from "react-bootstrap";
import SaveToast from "./SaveToast";
import { SavedRecipesContext } from "../SavedRecipesContext";
import { Link } from "react-router-dom";

export default function Content({ results }) {
  const [showToast, setShowToast] = useState(false);
  const { saveRecipe, unsaveRecipe, isRecipeSaved } = useContext(
    SavedRecipesContext
  );
  return (
    <div className="container my-3 d-flex flex-wrap align-items-center justify-content-center">
      <SaveToast show={showToast} onClose={() => setShowToast(false)} />
      {results
        ? results.map((recipe) => {
            return (
              <Card
                id={recipe.id}
                style={{ width: "18rem" }}
                className="my-2 mx-2 bg-dark"
              >
                <Card.Img variant="top" src={recipe.image} loading="lazy" />
                <Card.Body>
                  <Card.Title>{recipe.title}</Card.Title>
                  <div className="d-flex justify-content-between">
                    <Link
                      to={`/detail/${recipe.id}`}
                      className="btn btn-success"
                    >
                      See more...
                    </Link>
                    {isRecipeSaved(recipe) ? (
                      <button
                        className="btn btn-danger"
                        onClick={() => unsaveRecipe(recipe)}
                      >
                        Unsave
                      </button>
                    ) : (
                      <button
                        className="btn btn-success"
                        onClick={() => saveRecipe(recipe, setShowToast)}
                      >
                        Save
                      </button>
                    )}
                  </div>
                </Card.Body>
              </Card>
            );
          })
        : "NO RECIPES FOUND!!"}
    </div>
  );
}
