import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';
import Heading from '../../components/Heading';

const Locations = () => {
  return (
    <>
      <Heading>Локации</Heading>
      <LinkContainer to="1">
        <Button>Location 1</Button>
      </LinkContainer>

      <LinkContainer to="new">
        <Button>Add Location</Button>
      </LinkContainer>
    </>
  );
};

export default Locations;
