import { opendirSync } from "fs"

interface ArticleCard {
    _id: string
    author: string
    title: string
    description: string
    date: string
    imageUrl: string
  }

const CardComponent: React.FC<ArticleCard> = (props) => {
    
    return(
        <div className = "mb-4 flex p-4 shadow-xl rounded-xl h-48 sm:h-64 relative border hover:border-indigo-500">
            <img src = {props.imageUrl ? props.imageUrl : "/placeholder.jpg"} className = "w-1/2 object-cover rounded-l-xl"></img>
            <div className = "w-1/2 rounded-r-xl p-4">
                <h1 className = "font-bold text-md sm:text-md">{props.title}</h1>
                <p className = "py-1 text-indigo-500 font-bold text-sm sm:text-md">{"by " + props.author}</p>
                <div className = "overflow-hidden invisible sm:visible">
                <p>{props.description}</p>
                </div>
                <p className = "font-bold text-right text-sm sm:text-md absolute bottom-4 right-4">{props.date}</p>
                
            </div>
        </div>
    )

}

export default CardComponent