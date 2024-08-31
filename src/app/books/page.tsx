import Image from "next/image";
import { Metadata } from "next";
import book from "../../assets/images/book.jpg";
import Link from "next/link";

export default function BookDetails() {
  return (
    <div className="px-[5%] py-[5%]">
      <div className="mb-6">
        {" "}
        <Link
          className="rounded-sm bg-blue-600 text-white py-2 px-3 mt-5"
          href="/books/add"
        >
          Add New Book
        </Link>
      </div>
      <div className="flex gap-10 flex-wrap items-stretch">
        <div className="mb-8 flex w-[300px] flex-col items-center gap-8 font-poppins border rounded-[10px]">
          <div className="w-full">
            <Image
              src={book}
              alt="Book Cover"
              className="w-full object-cover overflow-hidden"
              layout="responsive"
            />
          </div>
          <div className="flex w-full flex-col">
            <div className="flex items-center gap-5 justify-center">
              <div className="rounded-[5px] bg-black px-2 py-1 text-white">
                Adventure
              </div>
              <span className="text-[14px] text-[#02aee0]">J.R.R. Martin</span>
            </div>
            <div className="mt-4 text-[20px] text-center">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Reiciendis, eum.
            </div>
          </div>
        </div>
      </div>
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
