import { apiKey } from "../utils/API";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import RecipePDF from "./RecipePDF";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Loader from "./Loader";

export default function Detail() {
  const { id } = useParams();
  console.log(id);
  const [recipe, setRecipe] = useState(null);
  const getInfo = useCallback(async () => {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false`,
      {
        params: {
          apiKey: apiKey
        }
      }
    );
    console.log(response.data);
    return response.data;
  }, [id]);
  useEffect(() => {
    async function fetchRecipe() {
      const data = await getInfo();
      setRecipe(data);
    }
    fetchRecipe();
  }, [getInfo, id]);

  if (!recipe) {
    return <Loader />;
  }
  console.log(recipe);
  return (
    <>
      <div className="container flex-column align-items-center justify-content-center py-3 load">
        <Image src={recipe.image} alt={recipe.title} />
        <Buttons recipe={recipe} />
        <InnerDetails recipe={recipe} />
      </div>
    </>
  );
}

function Image({ src, alt }) {
  return (
    <div className="d-flex align-items-center justify-content-center my-2">
      <img src={src} alt={alt} className="mx-auto img-fluid" />
    </div>
  );
}

function Buttons({ recipe }) {
  const navigate = useNavigate();
  return (
    <Row className="my-3">
      <Col>
        <Button
          variant="success"
          onClick={() => {
            navigate("..");
          }}
        >
          Back
        </Button>
      </Col>
      <Col>
        <PDFDownloadLink
          document={<RecipePDF recipe={recipe} />}
          fileName="recipe.pdf"
          className="btn btn-success"
        >
          {({ blob, url, loading, error }) =>
            loading ? "Loading document..." : "Download now!"
          }
        </PDFDownloadLink>
      </Col>
    </Row>
  );
}

function InnerDetails({ recipe }) {
  return (
    <>
      <h1>{recipe.title}</h1>
      <p>Servings: {recipe.servings}</p>
      <p>Ready in: {recipe.readyInMinutes} minutes</p>
      <div>
        <div dangerouslySetInnerHTML={{ __html: recipe.summary }} />
        {recipe.extendedIngredients ? (
          <ul>
            {recipe.extendedIngredients.map((ingredient) => (
              <li key={ingredient.id}>
                {ingredient.amount} {ingredient.unit} {ingredient.name}
              </li>
            ))}
          </ul>
        ) : (
          ""
        )}
      </div>
      <h1>How to make {recipe.title} ??</h1>
      <p>{recipe.description}</p>
      {recipe.ingredients ? (
        <ul>
          {recipe.ingredients.map((ingredient) => (
            <li key={ingredient}>{ingredient}</li>
          ))}
        </ul>
      ) : (
        ""
      )}
      {recipe.instructions ? (
        <div dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
      ) : (
        ""
      )}
    </>
  );
}
