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
    <>
      <Header />
      <div className="mt-7 items-center justify-center">
        <img src="/images/lens.jpg" alt="" className="mx-auto w-40" />
        <div className="mx-auto mt-7 flex max-w-5xl justify-between space-x-10 p-12 text-center">
          <div className="">
            <p className="text-2xl"> {profile.name}</p>
            <p> *HANDLE*</p>
            <p>id#</p>
            <p> {profile.email}</p>
            <p> {profile.website}</p>
            <p> {profile.address.city}</p>
            {/* hardcoded*/}
            <a className="mt-1 flex" href="">
              <img src="/images/twitter.svg" alt="" className="mx-auto h-4" />
            </a>
          </div>
          <div>
            <p className="text-gray-400">
              {" "}
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
            </p>
          </div>
        </div>
        <div className="mt-11 sm:flex sm:justify-center">
          <div className="p-2 shadow-md">
            <div className="">
              <div className="flex flex-col">
                <div className="w-25 flex space-x-8">
                  <div className="">
                    <div className="text-sm uppercase text-gray-400">
                      Follows:
                    </div>
                    <div className="mt-1">
                      <div className="flex items-center space-x-2">
                        <div className="text-2xl">4</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-2 shadow-md">
            <div className="">
              <div className="flex flex-col">
                <div className="w-25 flex space-x-8">
                  <div className="">
                    <div className="text-sm uppercase text-gray-400">
                      Following:
                    </div>
                    <div className="mt-1">
                      <div className="flex items-center space-x-2">
                        <div className="text-2xl">1</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-2 shadow-md">
            <div className="">
              <div className="flex flex-col">
                <div className="w-25 flex space-x-8">
                  <div className="">
                    <div className="text-sm uppercase text-gray-400">
                      Posts:
                    </div>
                    <div className="mt-1">
                      <div className="flex items-center space-x-2">
                        <div className="text-2xl">7</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-2 shadow-md">
            <div className="">
              <div className="flex flex-col">
                <div className="w-25 flex space-x-8">
                  <div className="">
                    <div className="text-sm uppercase text-gray-400">
                      Comments:
                    </div>
                    <div className="mt-1">
                      <div className="flex items-center space-x-2">
                        <div className="text-2xl">0</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-2 shadow-md">
            <div className="">
              <div className="flex flex-col">
                <div className="w-25 flex space-x-8">
                  <div className="">
                    <div className="text-sm uppercase text-gray-400">
                      Mirrors:
                    </div>
                    <div className="mt-1">
                      <div className="flex items-center space-x-2">
                        <div className="text-2xl">1</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-2 shadow-md">
            <div className="">
              <div className="flex flex-col">
                <div className="w-25 flex space-x-8">
                  <div className="">
                    <div className="text-sm uppercase text-gray-400">
                      Publications:
                    </div>
                    <div className="mt-1">
                      <div className="flex items-center space-x-2">
                        <div className="text-2xl">11</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-2 shadow-md">
            <div className="flex flex-col">
              <div className="w-25 flex space-x-8">
                <div className="">
                  <div className="text-sm uppercase text-gray-400">
                    Collects:
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-2xl ">0</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Details;
