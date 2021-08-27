import { useUser } from "@auth0/nextjs-auth0";
import DOMPurify from "isomorphic-dompurify";
import marked from "marked";
import { Dispatch } from "react";

//to get Markdown to work properly with tailwindcss I've created a ".unreset" scss-class in the tailwind folder (unreset.scss) and imported into _app.js and then used in the ReactMarkdown element.
//watch "https://www.youtube.com/watch?v=iLEYtgBezhs" for details

//another possibility to get Markdown to work is to switch off preflight mode in the tailwind.config.js file. Like this: "module.exports = {corePlugins: { preflight: false, }, ...}.
//However, this would mess with the default tailwind style and change the appearance of your app (see Tailwind (preflight) documentaion for details)

//And by the way, there is no way to get ReactMarkdown to work while using getStaticProps (webpack error). So there's no way around "dangerouslySetInnerHTML" in combination with the sanitize function (createCleanMArkdown()) below.

interface Submission {
  edit: boolean;
  author?: string;   //using "?" because Sumisson is used in "edit-mode" as well as "new-article-mode" 
  title?: string;
  description?: string;
  markdown: string;
  imageUrl?: string
  submitHandler?: () => void;
  resubmitHandler?: () => void;
  deleteHandler?: () => void;
  setTitle: Dispatch<string>;
  setDescription: Dispatch<string>;
  setMarkdown: Dispatch<string>;
  setImageUrl: Dispatch<string>
}

export function renderCleanMarkdown(md: string) {
  let cleanMd = DOMPurify.sanitize(md);
  return { __html: marked(cleanMd) };
}

const InputOutput: React.FC<Submission> = (props) => {
  const user = useUser();

  return (
    <div className="h-full p-4 grid grid-cols-2">
      {!user && (
        <div className="flex items-center justify-center text-2xl">
          YOU'RE NOT AUTHORIZED TO VIEW THIS CONTENT. LOGIN BEFORE YOU START
          WRITING A NEW BLOG!
        </div>
      )}
      {user && (
        <>
          <div className="">
            <div className="">
              <form className="flex flex-col border p-2">
                <label htmlFor="input">Title</label>
                <input
                  spellCheck="false"
                  className="border p-2"
                  placeholder="Start Here..."
                  onChange={(e) => props.setTitle(e.target.value)}
                  defaultValue={props.title ? props.title : ""}
                ></input>
                <label htmlFor="input">Image Url</label>
                <input
                  spellCheck="false"
                  className="border p-2"
                  placeholder="Start Here..."
                  onChange={(e) => props.setImageUrl(e.target.value)}
                  defaultValue={props.imageUrl ? props.imageUrl : ""}
                ></input>
                <label htmlFor="textarea">Description</label>
                <textarea
                  placeholder="Start Here..."
                  className="border h-48 p-2"
                  onChange={(e) => props.setDescription(e.target.value)}
                  defaultValue={props.description ? props.description : ""}
                ></textarea>
                <label htmlFor="textarea">Main Content (Markdown)</label>
                <textarea
                  spellCheck="false"
                  placeholder="Start Here..."
                  className="border h-96 p-2"
                  onChange={(e) => props.setMarkdown(e.target.value)}
                  defaultValue={props.markdown ? props.markdown : ""}
                ></textarea>
              </form>
              {!props.edit && (
                <button
                  className="my-2 p-2 border-2 rounded full bg-red-400 text-gray-700 font-bold"
                  onClick={props.submitHandler}
                >
                  SUBMIT!
                </button>
              )}
              {props.edit && (
                <span>
                  <button
                    className="my-2 p-2 border-2 rounded full bg-green-400 text-gray-700 font-bold"
                    onClick={props.resubmitHandler}
                  >
                    RESUBMIT!
                  </button>
                  <button
                    className="my-2 p-2 border-2 rounded full bg-red-400 text-gray-700 font-bold"
                    onClick={props.deleteHandler}
                  >
                    DELETE!
                  </button>
                </span>
              )}
            </div>
          </div>
          <div className="ml-4 h-2/3 flex-none">
            <label htmlFor="input" className="font-bold">
              Markdown Preview
            </label>
            <div
              className="h-full p-2 border overflow-scroll unreset"
              dangerouslySetInnerHTML={renderCleanMarkdown(props.markdown)}
            ></div>
          </div>
        </>
      )}
    </div>
  );
};

export default InputOutput;
