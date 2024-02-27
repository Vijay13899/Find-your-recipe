import { useEffect, useState } from "react";
import { Button, Form, Stack, Row, Col } from "react-bootstrap";
import {
  searchRecipesByName,
  searchRecipesByNutrients,
  searchRecipesByIngredients
} from "../utils/API";
import Loader from "./Loader";
import Content from "./Content";

const storedResults = JSON.parse(
  window.sessionStorage.getItem("searchDetails")
);
export default function Search() {
  const [term, setTerm] = useState(
    storedResults ? storedResults.searchQuery : ""
  );
  const [mode, setMode] = useState(storedResults ? storedResults.mode : "");
  const [IsVeg, setIsVeg] = useState(
    storedResults ? storedResults.IsVeg : false
  );
  const [Results, setResults] = useState(
    storedResults ? storedResults.searchDetails : []
  );
  const [nutrientValues, setNutrientValues] = useState(
    storedResults
      ? {
          carbohydrates: {
            min: storedResults.nutrientValues.carbohydrates.min,
            max: storedResults.nutrientValues.carbohydrates.max
          },
          protein: {
            min: storedResults.nutrientValues.protein.min,
            max: storedResults.nutrientValues.protein.max
          },
          fat: {
            min: storedResults.nutrientValues.fat.min,
            max: storedResults.nutrientValues.fat.max
          },
          calories: {
            min: storedResults.nutrientValues.calories.min,
            max: storedResults.nutrientValues.calories.max
          }
        }
      : {
          carbohydrates: { min: 10, max: 100 },
          protein: { min: 10, max: 100 },
          fat: { min: 1, max: 100 },
          calories: { min: 50, max: 800 }
        }
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  let result;
  async function handleSubmit(e) {
    e.preventDefault();
    if (!term && mode !== "3") {
      return;
    }
    console.log(term);
    console.log(nutrientValues);
    console.log(mode);
    switch (mode) {
      case "1":
        result = await searchRecipesByName(term, IsVeg);
        break;
      case "2":
        result = await searchRecipesByIngredients(term, IsVeg);
        break;
      case "3":
        result = await searchRecipesByNutrients(nutrientValues, IsVeg);
        break;
      default:
        result = await searchRecipesByName(term, IsVeg);
        break;
    }
    window.sessionStorage.setItem(
      "searchDetails",
      JSON.stringify({
        searchQuery: term,
        searchDetails: result,
        nutrientValues: nutrientValues,
        mode: mode,
        IsVeg: IsVeg
      })
    );
    setResults(result);
    console.log(result);
  }

  return (
    <>
      {loading === true ? (
        <Loader />
      ) : (
        <>
          <div className="container py-3 load">
            <h1 className="text-center">Search</h1>
            <Form onSubmit={handleSubmit}>
              <SelectMode mode={mode} setMode={setMode} />
              {mode !== "3" ? <SearchBar term={term} setTerm={setTerm} /> : ""}
              {mode === "3" ? (
                <NutrientInput
                  nutrientValues={nutrientValues}
                  setNutrientValues={setNutrientValues}
                />
              ) : (
                ""
              )}
              {mode !== "2" ? (
                <label className="my-3">
                  <input
                    type="checkbox"
                    onChange={() => {
                      setIsVeg(!IsVeg);
                    }}
                    checked={IsVeg}
                  />{" "}
                  Vegetarian only
                </label>
              ) : (
                ""
              )}
              <Stack className="align-items-center">
                <Button type="submit" variant="success">
                  Search
                </Button>
              </Stack>
            </Form>
            <Content results={Results} />
          </div>
        </>
      )}
    </>
  );
}

function SearchBar({ term, setTerm }) {
  return (
    <Stack className="my-3">
      <Form.Group controlId="title">
        <Form.Label>Search Term</Form.Label>
        <Form.Control
          required
          placeholder="Pizza, or sugar,bread,cream etc."
          onChange={(e) => {
            setTerm(e.target.value);
          }}
          value={term}
        />
      </Form.Group>
    </Stack>
  );
}

function SelectMode({ mode, setMode }) {
  return (
    <Stack className="my-3">
      <Form.Group>
        <Form.Label>Search mode</Form.Label>
      </Form.Group>
      <Form.Select
        aria-label="Default select example"
        onChange={(e) => {
          setMode(e.target.value);
        }}
        value={mode}
      >
        <option value="1">Using Name</option>
        <option value="2">Ingredients</option>
        <option value="3">Nutrients</option>
      </Form.Select>
    </Stack>
  );
}

function NutrientInput({ nutrientValues, setNutrientValues }) {
  // Function to handle input changes for minimum values
  const handleMinInputChange = (event, nutrient) => {
    const { value } = event.target;
    if (value === "") {
      // Set a default value (e.g., 0) or provide user feedback
      // You can also choose to ignore empty input if necessary
      setNutrientValues({
        ...nutrientValues,
        [nutrient]: {
          ...nutrientValues[nutrient],
          min: 0 // Set a default value here
        }
      });
    } else {
      const parsedValue = parseFloat(value);
      if (!isNaN(parsedValue)) {
        setNutrientValues({
          ...nutrientValues,
          [nutrient]: {
            ...nutrientValues[nutrient],
            min: parsedValue
          }
        });
      }
    }
  };

  // Function to handle input changes for maximum values
  const handleMaxInputChange = (event, nutrient) => {
    const { value } = event.target;
    if (value === "") {
      // Set a default value (e.g., 0) or provide user feedback
      // You can also choose to ignore empty input if necessary
      setNutrientValues({
        ...nutrientValues,
        [nutrient]: {
          ...nutrientValues[nutrient],
          max: 0 // Set a default value here
        }
      });
    } else {
      const parsedValue = parseFloat(value);
      if (!isNaN(parsedValue)) {
        setNutrientValues({
          ...nutrientValues,
          [nutrient]: {
            ...nutrientValues[nutrient],
            max: parsedValue
          }
        });
      }
    }
  };
  return (
    <Stack className="my-3">
      <Row>
        <Row className="my-3">
          <Col>Nutrient</Col>
          <Col>MIN</Col>
          <Col>MAX</Col>
        </Row>
        {Object.keys(nutrientValues).map((nutrient) => (
          <Row className="my-2">
            <Col>{nutrient}</Col>
            <Col>
              <Form.Group>
                <Form.Control
                  value={nutrientValues[nutrient].min}
                  onChange={(event) => handleMinInputChange(event, nutrient)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Control
                  value={nutrientValues[nutrient].max}
                  onChange={(event) => handleMaxInputChange(event, nutrient)}
                />
              </Form.Group>
            </Col>
          </Row>
        ))}
      </Row>
    </Stack>
  );
}
