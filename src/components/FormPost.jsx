import React from "react";
import { Container, Form, Button, FormGroup } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { withRouter } from "react-router-dom";
import { useHistory } from "react-router";
import DisplayBlogs from "./displayBlogs";

function FormPost() {
  const history = useHistory();
  const titleRef = React.createRef();
  const categoryRef = React.createRef();
  // const contentRef = React.createRef();
  const [imagePreview, setImagePreview] = React.useState({
    text: "",
    image: { file: null },
    previewURL: "",
  });

  function handleChange(value) {
    setImagePreview({ ...imagePreview, text: value });
  }

  async function handleSubmit(e) {
    console.log(history);
    e.preventDefault();
    console.log();
    const body = {
      title: titleRef.current.value,
      category: categoryRef.current.value,
      // content: contentRef.current.value,
    };

    const response = await fetch("http://localhost:3001/blogPosts", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const jsonResponse = await response.json();

    if (!response.ok) {
      alert(JSON.stringify(jsonResponse));
      return;
    }

    const { image } = imagePreview;

    const bodyMultipart = new FormData();
    bodyMultipart.append("blogPic", image.file, image.file.name);

    const responseUpload = await fetch(
      `http://localhost:3001/blogPosts/${jsonResponse.id}/uploadCover`,
      {
        method: "POST",
        headers: { Accept: "application/json" },
        body: bodyMultipart,
      }
    );

    if (!responseUpload.ok) {
      alert(JSON.stringify(jsonResponse));
      return;
    }
  }

  async function handleFileChange(e) {
    const { files } = e.target;

    if (files) {
      setImagePreview({
        ...imagePreview,
        image: {
          file: files[0],
          previewURL: URL.createObjectURL(files[0]),
        },
      });
    }
  }

  return (
    <Container>
      <Form onSubmit={(e) => handleSubmit(e)} className="custom-form">
        <Form.Group controlId="blog-form" className="mt-3 custom-title">
          <Form.Label>Title</Form.Label>
          <Form.Control size="lg" placeholder="Title" ref={titleRef} />
        </Form.Group>
        <Form.Group controlId="blog-category" className="mt-3 custom-cat">
          <Form.Label>Category</Form.Label>
          <Form.Control size="lg" as="select" ref={categoryRef}>
            <option>Amazing animals</option>
            <option>Nature</option>
            <option>Food</option>
            <option>Mixed category</option>
            <option>Bright and colorful</option>
          </Form.Control>
        </Form.Group>
        <FormGroup
          className="mt-4"
          method="POST"
          action="/upload"
          enctype="multipart/form-data"
        >
          {imagePreview.image.file && (
            <img
              src={imagePreview.image.previewURL}
              alt="Blog cover"
              className="preview"
            />
          )}
          <input type="file" onChange={(e) => handleFileChange(e)} />
          <p className="warning">
            Upload an image or the picture of dancing unicorn will be used
          </p>
        </FormGroup>
        <Form.Group controlId="blog-content" className="mt-3 ">
          <Form.Label>Blog Content</Form.Label>
          <ReactQuill
            value={imagePreview.text}
            onChange={handleChange}
            className="custom-content"
          />
        </Form.Group>
        <Form.Group className="d-flex mt-3 justify-content-end">
          <Button type="reset" size="lg" variant="outline-dark">
            Reset
          </Button>
          <Button
            type="submit"
            size="lg"
            variant="dark"
            style={{ marginLeft: "1em" }}
          >
            Submit
          </Button>
        </Form.Group>
      </Form>

      <DisplayBlogs />
    </Container>
  );
}

export default withRouter(FormPost);
