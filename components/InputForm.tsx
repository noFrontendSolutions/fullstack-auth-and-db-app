import { useUser } from "@auth0/nextjs-auth0";
import DOMPurify from "isomorphic-dompurify";
import marked from "marked";
import { Dispatch } from "react";

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
    <div className="h-full p-4">
      {!user && (
        <div className="flex items-center justify-center text-2xl">
          YOU'RE NOT AUTHORIZED TO VIEW THIS CONTENT. LOGIN BEFORE YOU START
          WRITING A NEW BLOG!
        </div>
      )}
      {user && (
        <>
          <div className="fixed w-1/2 min-h-full">
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
          <div className="mt-8 ml-4 min-h-full absolute right-8 min-w-1/2 ">
            <label htmlFor="input" className="font-bold">
              Markdown Preview
            </label>
            <div
              className="h-full ml-8 p-2 prose prose-sm sm:prose lg:prose-lg xl:prose-xl"
              dangerouslySetInnerHTML={renderCleanMarkdown(props.markdown)} //There was no way to get ReactMarkdown to work in combination with getStaticProps (at least I think that this was causing the webpack error). So there's no way around "dangerouslySetInnerHTML". I hope the sanitize function (createCleanMArkdown()) does the trick.
            ></div>
          </div>
        </>
      )}
    </div>
  );
};

export default InputOutput;
