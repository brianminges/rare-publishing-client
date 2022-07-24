import React, { useEffect, useState } from "react";
import { getCategories, getCategoryById, updateCategory } from "./CategoryManager";
import { useHistory, useParams } from "react-router-dom";

export const UpdateCategoryForm = () => {
    const [category, setCategory] = useState({
        label: "",
    });

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useHistory();
    const {categoryId} = useParams();

    const loadCategories = () => {
        getCategories().then(data => setCategory);
    }

    useEffect(() => {
        loadCategories();
    }, [])

    const handleFieldChange = (event) => {
        const stateToChange = { ...category };
        stateToChange[event.target.name] = event.target.value;
        setCategory(stateToChange);
    }

    const updateExistingCategory = (event) => {
        event.preventDefault();
        setIsLoading(true);

        const editedCategory = {
            id: category.id,
            label: category.label,
        };

        updateCategory(editedCategory)
            .then(() => navigate.push("/categories"))
            .catch(err => console.log(err));
    }

    useEffect(() => {
        getCategoryById(categoryId)
            .then(category => {
                setCategory(category);
                setIsLoading(false);
            }
            , [])
    }, []);

    return (
        <div className="categoryForm">
            <form>
                <fieldset>
                    <div className="formgrid">
                        <label htmlFor="label">Category name</label>
                        <input
                            type="text"
                            name="label"
                            className="form__input"
                            required
                            placeholder="Category name"
                            value={category.label}
                            onChange={handleFieldChange}
                        />
                        <button type="submit" 
                            onClick={updateExistingCategory}
                            className="formgrid__button">
                            Update
                        </button>
                    </div>
                </fieldset>
            </form>
        </div>
    );
}