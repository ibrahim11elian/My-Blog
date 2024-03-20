const articleValidate = (values) => {
  let isError = false;
  let errors = {};

  if (!values.title) {
    errors.title = "Article title is required";
    isError = true;
  }

  if (!values.author) {
    errors.author = "Author name is required";
    isError = true;
  }

  if (!values.description) {
    errors.description = "Article description is required";
    isError = true;
  }
  // Checking the length of the article description.
  else if (values.description.length < 30) {
    errors.description = "Description must be at least 30 characters long.";
    isError = true;
  }

  if (!values.content) {
    errors.content = "Content is required.";
    isError = true;
  } else if (
    values.content.split("\n").filter((item) => item != "").length <= 15
  ) {
    errors.content = "Your content should contain more than 15 lines.";
    isError = true;
  }

  const linkRegEx =
    /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)$/gm;

  if (!values.cover) {
    errors.cover = "Cover image is required";
    isError = true;
  } else if (!linkRegEx.test(values.cover)) {
    const formats = ["jpg", "png", "jpeg"];
    const format = values.cover.split(".").pop().toLowerCase();
    if (!formats.includes(format)) {
      errors.cover = "Invalid file format. Please use jpg, png or jpeg.";
      isError = true;
    }
  }

  return [isError, errors];
};

export default articleValidate;
