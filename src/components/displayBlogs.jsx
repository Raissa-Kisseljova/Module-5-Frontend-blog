import { useEffect, useState } from "react";
import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { BACKEND_URL } from "../configs";

function DisplayBlogs() {
  const [fetchedPosts, setFetchedPosts] = useState([]);

  useEffect(() => {
    const response = fetch(`${BACKEND_URL}/blogPosts`)
      .then((response) => response.json())
      .then((data) => {
        setFetchedPosts(data);
      });
  }, [fetchedPosts]);

  return (
    <>
      <Row>
        {fetchedPosts.map((post) => {
          return (
            <Col lg={4} md={4} sm={6} xs={6}>
              <div className="blog-div" key={post.id}>
                <div>
                  <img
                    src={
                      post.imageURL ||
                      "https://projects-static.raspberrypi.org/projects/dancing-unicorn-rainbow/4d09ee9c58241c8f709c35e22472c4f2728ab83a/en/images/banner.png"
                    }
                    alt=""
                    className="uploaded-img"
                  />
                </div>
                <h5>{post.title}</h5>
                <span>{post.category}</span>
                <p>{post.content}</p>
                <div>
                  <Button variant="outline-info">Edit</Button>{" "}
                  <Button
                    variant="outline-danger"
                    onClick={() =>
                      fetch(`${BACKEND_URL}/blogPosts/${post.id}/`, {
                        method: "DELETE",
                      })
                    }
                  >
                    Delete
                  </Button>{" "}
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    </>
  );
}

export default DisplayBlogs;
