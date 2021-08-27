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
        <div className = "flex p-4 shadow-xl rounded-xl h-64 relative hover:border hover:border-blue-500">
            <img src = {props.imageUrl ? props.imageUrl : "/placeholder.jpg"} className = "w-1/2 object-cover rounded-l-xl"></img>
            <div className = "w-1/2 rounded-r-xl p-4">
                <h1 className = "font-bold text-lg">{props.title}</h1>
                <p className = "text-indigo-500 font-bold text-md">{"by " + props.author}</p>
                <p>{props.description}</p>
                    <p className = "font-bold text-right absolute bottom-4 right-4">{props.date}</p>
                
            </div>
        </div>
    )

}

export default CardComponent