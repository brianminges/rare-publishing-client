import react from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import "./CategoryCard.css"
import "./../Rare.css"
import { deleteCategory, getCategories } from "./CategoryManager";
import { useEffect, useState } from "react";

export const CategoryCard = ({ category }) => {
    const history = useHistory()
    const {categoryId} = useParams();
    const [categories, setCategories] = useState([])

    const loadCategories = () => {
        getCategories().then(data => setCategories(data));
    }
    
    useEffect(() => {
        loadCategories();
    }, []);

    useEffect(()  => {
        console.log(categories)
    }, [categories])

    const delCategory = (categoryId) => {
        deleteCategory(categoryId)
    }

    return (
        <>
        <section className="categorycard">
            <div className="categorycard__header">
                <h3 className="categorycard__header__title">{category.label}</h3>
            </div>
            <div className="category_btn">
                <button 
                    className="cardBtn" 
                    id="cardBbt__edit"
                    onClick={() => history.push(`/categories/${category.id}/edit`)}
                    >✒️</button>
                <button 
                    className="cardBtn" 
                    id="cardBbt__delete"
                    onClick={() => {
                        delCategory(category.id)
                        window.location.reload(false)
                    }}>🗑️</button>
            </div>
        </section>
        </>
    )
}
