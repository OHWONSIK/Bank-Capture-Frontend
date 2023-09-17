import { useParams } from "react-router-dom";

function ReviewPage(props) {
  const{reservationId} = useParams();
  return (
      <div>
          리뷰페이지요: {reservationId}
      </div>
  );
}
export default ReviewPage;