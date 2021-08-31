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
    <div className="min-h-full p-4 grid grid-cols-1 w-full xl:w-1/2 self-center">
      {!user && (
        <div className="flex items-center justify-center text-2xl">
          YOU'RE NOT AUTHORIZED TO VIEW THIS CONTENT!
        </div>
      )}
      {user && (
        <>
              <form className="flex flex-col border p-2">
                <label htmlFor="input" className = "font-bold text-gray-700">Card Title:</label>
                <input
                  spellCheck="false"
                  className="border p-2"
                  placeholder="Start Here..."
                  onChange={(e) => props.setTitle(e.target.value)}
                  defaultValue={props.title ? props.title : ""}
                ></input>
                <label htmlFor="input" className = "font-bold text-gray-700">Card Image Url:</label>
                <input
                  spellCheck="false"
                  className="border p-2"
                  placeholder="Start Here..."
                  onChange={(e) => props.setImageUrl(e.target.value)}
                  defaultValue={props.imageUrl ? props.imageUrl : ""}
                ></input>
                <label htmlFor="textarea" className = "font-bold text-gray-700">Card Description:</label>
                <textarea
                  spellCheck="false"
                  placeholder="Start Here..."
                  className="border h-48 p-2"
                  onChange={(e) => props.setDescription(e.target.value)}
                  defaultValue={props.description ? props.description : ""}
                ></textarea>
                <label htmlFor="textarea" className = "font-bold text-gray-700 mt-4">Article Content (Markdown):</label>
                <textarea
                  spellCheck="false"
                  placeholder=""
                  className="border h-96 p-2 font-mono bg-gray-700 text-white"
                  onChange={(e) => props.setMarkdown(e.target.value)}
                  defaultValue={props.markdown ? props.markdown : ""}
                ></textarea>
              </form>
              {!props.edit && (
                <button
                  className="my-2 p-2 border-2 text-white bg-indigo-500 rounded-xl font-bold"
                  onClick={props.submitHandler}
                >
                  SUBMIT!
                </button>
              )}
              {props.edit && (
                <div className = "w-full flex justify-between">
                  <button
                    className="my-2 p-2 border-2 text-white bg-green-500 rounded-xl font-bold w-48"
                    onClick={props.resubmitHandler}
                  >
                    SAVE CHANGES
                  </button>
                  <button
                    className="my-2 p-2 border-2 text-white bg-red-500 rounded-xl font-bold w-48"
                    onClick={props.deleteHandler}
                  >
                    DELETE ARTICLE
                  </button>
                </div>
              )}
          
            <label htmlFor="input" className="mt-8 font-bold text-lg">
              Markdown Preview
            </label>
            <div
              className="pt-8 prose prose-sm sm:prose lg:prose-lg xl:prose-xl border-t-4 self-center"
              dangerouslySetInnerHTML={renderCleanMarkdown(props.markdown)} //There was no way to get ReactMarkdown to work in combination with getStaticProps (at least I think that this was causing the webpack error). So there's no way around "dangerouslySetInnerHTML". I hope the sanitize function (createCleanMArkdown()) does the trick.
            ></div>
        
        </>
      )}
    </div>
  );
};

export default InputOutput;