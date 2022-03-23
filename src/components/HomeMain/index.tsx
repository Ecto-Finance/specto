import { useProfilesQuery } from "generated/graphql";
import { useEffect } from "react";

export const HomeMain = () => {
  const { data, loading, error } = useProfilesQuery({
    variables: {
      request: {
        ownedBy: ["0x235596f35fdeac45a59bf38640dd68f19a85de39"],
      },
    },
  });

  useEffect(() => {
    console.log(data?.profiles.items);
  }, [data]);

  if (loading)
    return <div className="flex items-center justify-center">Loading...</div>;

  if (error)
    return <div className="flex items-center justify-center">Error</div>;

  return (
    <div className="flex flex-col items-center justify-center">
      {data.profiles.items.map((profile) => {
        <div className="text-white" key={profile.id}>
          <p>{profile.handle}</p>
        </div>;
      })}
    </div>
  );
};
