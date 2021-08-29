import { GetStaticProps } from "next";
import Link from "next/link";
import { connectToDB } from "../database/db-related";

interface Contributer {
  name: string
  email: string
  profileImage: string
}


const urlIt = (string: string) => {
  string = string.trim().toLowerCase().split(" ").join("-");
  return string;
};


export const getStaticProps: GetStaticProps = async () => {
  const allArticles = await connectToDB();
  let contributers: Contributer[] = [];
  let emailArray: string[] = []

  allArticles.forEach((article) => {
    if (!emailArray.includes(article.email)) {
      emailArray.push(article.email);
      let name = article.author
      let email = article.email
      let profileImage = article.profileImage
      let contributer = { name, email, profileImage }
      contributers.push(contributer)
    }
  });
  return {
    props: { contributers },
  };
};

const Contributers: React.FC<{contributers: Contributer[]}> = (props) => {
  return (
    <div className="min-h-full p-8 max-w-4xl">
      {props.contributers.map((contributer: Contributer) => (
        <Link key={urlIt(contributer.name)} href={"/contributions/" + urlIt(contributer.name)}>
          <a>
            <div className = "m-4 p-4 flex items-center border rounded-xl shadow-lg hover:border-blue-500">
            <img src = {contributer.profileImage ? contributer.profileImage : "./default-profile-img.png"} className = "rounded-full h-16 w-16"/>
            <p className="ml-4 text-blue-500 font-bold text-2xl text-center>">
              {contributer.name}
            </p>
            </div>
          </a>
        </Link>
      ))}
    </div>
  );
};

export default Contributers;
