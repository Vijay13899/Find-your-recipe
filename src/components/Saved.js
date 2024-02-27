import { Container } from "react-bootstrap";
import Content from "./Content";
import { SavedRecipesContext } from "../SavedRecipesContext";
import { useContext, useEffect, useState } from "react";
import Loader from "./Loader";

export default function Saved() {
  const { savedRecipes } = useContext(SavedRecipesContext);
  console.log(savedRecipes);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);
  return (
    <>
      {loading === true ? (
        <Loader />
      ) : (
        <Container className="py-3 load">
          <h1 className="text-center">Saved recipes</h1>
          <Content results={savedRecipes} />
        </Container>
      )}
    </>
  );
}
