/* eslint-disable @next/next/no-img-element */
import { Footer } from "components/Footer";
import { Header } from "components/Header";

export const getStaticPaths = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json();

  // map data to an array of path objects with params (id)
  const paths = data.map((profile) => {
    return {
      params: { id: profile.id.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

//example fetch reponse. waiting on fetch URL.
export const getStaticProps = async (context) => {
  const id = context.params.id;
  const res = await fetch("https://jsonplaceholder.typicode.com/users/" + id);
  const data = await res.json();

  return {
    props: { profile: data },
  };
};

const Details = ({ profile }) => {
  return (
    <div className="h-screen bg-primary-light p-2 dark:bg-primary-dark">
      <Header />
      <div className="mt-2 items-center justify-center">
        <img src="/images/lens.jpg" alt="" className="mx-auto w-52" />
        <div className="text-center">
          <p className="mt-8 mb-4 text-4xl">{profile.name}</p>
          <p>{profile.email}</p>
          <p>{profile.website}</p>
          <p>{profile.address.city}</p>
          <div className="mx-auto mt-6 max-w-3xl">
            <span className="text-black dark:text-gray-400">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industrys standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </span>
          </div>

          <div className="mx-auto mt-8 mb-24 max-w-2xl justify-between text-center text-sm text-black dark:text-gray-400 md:flex">
            Follows: <span className="text-primary-green">4</span>
            Following: <span className="text-primary-green">1</span>
            Posts: <span className="text-primary-green">4</span>
            Comments: <span className="text-primary-green">3</span>
            Mirrors: <span className="text-primary-green">3</span>
            Publications: <span className="text-primary-green">7</span>
            Collects: <span className="text-primary-green">0</span>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Details;
