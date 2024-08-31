import { Metadata } from "next";

type Props = {
  params: {
    bookId: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const title = await new Promise((resolve) =>
    setTimeout(() => resolve(`Novel : ${params.bookId}`), 100)
  );

  return {
    title: `Book : ${title}`,
  };
}

export default function BookDetails({ params }: Props) {
  return (
    <div>
      <h1>Book Details : {params.bookId}</h1>
    </div>
  );
}

/*
1)
The BookDetails function explicitly destructures params from an object and directly types params as { params: BookParams }.
This is a more specific and controlled way to handle typing in the function parameter.

2)
This references the Props type, which is more generalized and can be reused if needed.
The generateMetadata function also uses the same Props type, showing consistency and reuse of types across different functions.
*/

// interface BookParams {
//   bookId: string;
// }

// export default function BookDetails({ params }: { params: BookParams }) {
//   return <h1> BookId {params.bookId}</h1>;
// }
