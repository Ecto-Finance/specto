/* eslint-disable @next/next/no-img-element */
import { Footer } from "components/Footer";
import { Header } from "components/Header";
import { ChevronLeftIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { Follow } from "components/WalletSelector/Follow";

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
    <div className=" h-screen bg-primary-light p-2 dark:bg-primary-dark">
      <Header />
      <div className="mt-2 mb-40 items-center justify-center">
        <div className="">
          <img src="/images/lens.jpg" alt="" className="mx-auto w-52" />
          <Link href="/" passHref>
            <ChevronLeftIcon className="mx-auto mb-2 mt-4 w-10 cursor-pointer rounded-full border border-black text-black" />
          </Link>
        </div>
        <div className="text-center">
          <div className="mb-4 text-center text-4xl">
            <span className="ml-4 text-2xl">profile Id: #{profile.id}</span>
          </div>
          <Follow />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Details;
