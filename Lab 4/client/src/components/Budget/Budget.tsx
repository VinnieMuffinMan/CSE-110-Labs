import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { fetchBudget, updateBudget } from "../../utils/budget-utils";

const Budget = () => {
  const context = useContext(AppContext);
  const [text, setText] = useState(context.budget);

  useEffect(() => {
    loadBudget();
    }, []);
  
    // Function to load expenses and handle errors
    const loadBudget = async () => {
    try {
      const budget = await fetchBudget();
      context.setBudget(budget);
      setText(budget);
    } catch (err: any) {
      console.log(err.message);
    }
    };

    const [isEditing, setIsEditing] = useState(false);
  
    const handleEdit = () => {
      setIsEditing(true);
    };
  
    const handleSave = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, budget: number) => {
      event.preventDefault();
      updateBudget(budget);
      context.setBudget(budget);
      setText(budget);
      setIsEditing(false);
    };
  
    const handleChange = (event: any) => {
      setText(event.target.value);
    };

  return (
    <div className="alert alert-secondary p-3 d-flex align-items-center justify-content-between">
      {isEditing ? (
        <div>
          <input type="text" value={text} onChange={handleChange} />
          <button onClick={(event) => handleSave(event, text)} className="btn btn-primary mt-3">Save</button>
        </div>
      ) : (
        <div>
          <div>
            Budget: ${context.budget}
            <button onClick={handleEdit} className="btn btn-primary mt-3">Edit</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Budget;
