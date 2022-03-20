import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="mt-auto bg-light">
      <Container className="text-muted d-flex justify-content-center my-4">
        <a
          className="text-muted me-2"
          href="https://github.com/npwsk"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ника Перфилова
        </a>
        © 2022
      </Container>
    </footer>
  );
};

export default Footer;
