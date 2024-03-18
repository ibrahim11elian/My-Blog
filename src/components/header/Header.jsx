import { Container } from "react-bootstrap";
import PropTypes from "prop-types";
import { memo } from "react";

function Header({ headerText = "Script Symphony" }) {
  return (
    <section className="blog-section background d-flex align-items-center">
      <Container>
        <h1 className="blog-section-title text text-center border-color">
          {headerText}
        </h1>
      </Container>
    </section>
  );
}
export default memo(Header);

Header.propTypes = {
  headerText: PropTypes.string,
};
