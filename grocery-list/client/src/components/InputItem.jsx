import React, { Fragment, useState } from "react";

const InputItem = () => {
    const [content, setDescription] = useState("");

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = { content };
            const response = await fetch("http://localhost:3000/list", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            window.location = "/";
        } catch (err) {
            console.error(err.message)
        }
    }

    return (
        <Fragment>
            <h1 className="text-center mt-5">Grocery List</h1>
            <form className="d-flex mt-5" onSubmit={onSubmitForm}>
                <input 
                type="text" 
                className="form-control" 
                value={content} 
                onChange={e => setDescription(e.target.value)} 
                />
                <button className="btn btn-success">Submit Item</button>
            </form>
        </Fragment>
    )
}

export default InputItem;