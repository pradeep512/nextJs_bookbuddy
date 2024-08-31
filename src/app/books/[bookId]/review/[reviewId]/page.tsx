import { notFound } from "next/navigation";
interface ReviewParams {
  bookId: string;
  reviewId: string;
}

export default function ReviewDetail({ params }: { params: ReviewParams }) {
  if (parseInt(params.reviewId) > 1000) {
    notFound();
  }
  return (
    <div>
      <h1>Book id {params.bookId}</h1>
      <h2>Review id {params.reviewId}</h2>
    </div>
  );
}
