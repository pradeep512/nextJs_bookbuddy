export default function UserDetails({
  params,
}: {
  params: { slug: string[] };
}) {
  return (
    <div>
      <h1>User Details: {params.slug.join("/")}</h1>
      {params.slug.length === 1 && <h2>FirstName : {params.slug[0]}</h2>}
      {params.slug.length === 2 && <h3>LastName : {params.slug[1]}</h3>}
      {params.slug.length === 3 && <h4>Age : {params.slug[2]}</h4>}
    </div>
  );
}
