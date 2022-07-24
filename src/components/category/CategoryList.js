import react, { useEffect, useState }from "react";
import { useHistory } from "react-router-dom";
import { CategoryCard } from "./CategoryCard";
import { getCategories, createCategory } from "./CategoryManager";
import "./CategoryList.css";
import "./../Rare.css";


export const CategoryList = () => {
    const history = useHistory()
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState([]);
    
    const loadCategories = () => {
        getCategories().then(data => setCategories(data));
    }
    
    useEffect(() => {
        loadCategories();
    }, []);
    
    useEffect(() => {
        console.log(categories);
    }, [categories]);

    const changeState = (e) => {
        const newCategory = {...category}
        let selectedVal = e.target.value
        newCategory[e.target.name] = selectedVal
        setCategory(newCategory)
    }
    
    return (
        <article className="categorylist">
        <h2>Add category</h2>
        <form className="categoryForm">
            <fieldset>
                <div className="formgrid">
                    <label htmlFor="label">Category name</label>
                    <input 
                        type="text" 
                        name="label" 
                        className="form__input" 
                        required 
                        value={category.label} 
                        onChange={changeState}
                    />
                    <button type="submit"
                        onClick={(e) => {
                            e.preventDefault();
                            const newCategory = {
                                id: category.id,
                                label: category.label
                            }
                            createCategory(newCategory).then(() => history.push("/categories")).then(() => getCategories().then(setCategories))
                        }}
                        className="formgrid__button">Add</button>
                </div>
            </fieldset>
        </form>
        <h2>All categories</h2>
        {categories.map(category =>
            <CategoryCard
            key={category.id}
            category={category}
            />
        )}
        </article>
    );
    }