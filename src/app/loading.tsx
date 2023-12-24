import { Spinner } from "react-bootstrap";

const Loading = () => {
  return (
    <div>
      <div>Loading...</div>
      <Spinner animation="border" className="d-block m-auto" />
    </div>
  );
};

export default Loading;
