import { useEffect, useState } from "react";
import { Card, Carousel, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import ImageCarousel from "./Carousel";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const style = {
    width: "18rem",
    boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)"
  };
  const imgStyle = {
    background: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),url('https://images.unsplash.com/photo-1466637574441-749b8f19452f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80')`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
  };
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  return (
    <>
      {loading === true ? (
        <Loader />
      ) : (
        <>
          <div className="pb-3 text-center load">
            <div style={imgStyle}>
              <h1 className="py-4 text-light" style={{ fontSize: "48px" }}>
                Find Your Recipe
              </h1>
              <h4
                className="py-5 text-rose rising-up"
                style={{ fontSize: "32px" }}
              >
                Discover Delicious Recipes from Around the World
              </h4>
            </div>
            <p className="my-3 badge">Your Culinary Adventure Starts Here!</p>
            <ImageCarousel />
            <div className="cards d-flex flex-wrap align-items-stretch justify-content-evenly">
              <Card style={style} className="my-2 mx-2">
                <Card.Img
                  variant="top"
                  src="https://images.unsplash.com/photo-1613292443284-8d10ef9383fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
                  loading="lazy"
                />
                <Card.Body>
                  <Card.Title>
                    <Link to="/search" className="link">
                      Search recipes using 3 diff modes
                    </Link>
                  </Card.Title>
                </Card.Body>
              </Card>
              <Card style={style} className="my-2 mx-2">
                <Card.Img
                  variant="top"
                  src="https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1788&q=80"
                  loading="lazy"
                />
                <Card.Body>
                  <Card.Title>
                    <Link to="/browse" className="link">
                      Browse recipes from all over the world
                    </Link>
                  </Card.Title>
                </Card.Body>
              </Card>
              <Card style={style} className="my-2 mx-2">
                <Card.Img
                  variant="top"
                  src="https://images.unsplash.com/photo-1542010589005-d1eacc3918f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1792&q=80"
                  loading="lazy"
                />
                <Card.Body>
                  <Card.Title>
                    <Link to="/saved" className="link">
                      View Saved recipes and download as pdf
                    </Link>
                  </Card.Title>
                </Card.Body>
              </Card>
            </div>
          </div>
        </>
      )}
    </>
  );
}
