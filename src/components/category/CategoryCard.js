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
        <div className="category__list category__list__items">
            <p className="category__list__item category__list__item__one">{category.label}</p>
            <p className="category__list__item category__list__item__two">
                <button 
                    id="category__button__edit"
                    onClick={() => history.push(`/categories/${category.id}/edit`)}>
                    ✒️
                </button></p>
            <p className="category__list__item category__list__item__three"><button 
                    id="category__button__delete"
                    onClick={() => {
                        delCategory(category.id)
                        window.location.reload(false)
                    }}>
                        🗑️
                    </button></p>
        </div>
        </>
    )
}
