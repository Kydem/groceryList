import React, {Fragment, useEffect, useState} from "react";

const ListItems = () => {
    const getItems = async () => {
        try {
            const response = await fetch("http://localhost:3000/list")
            const jsonData = await response.json();
    
            console.log(jsonData);
        } catch (err) {
            console.error(err.message)
        }
    }
    useEffect(() => {
        getItems();
    })

    return (
    <Fragment>
      <table className="table mt-5 text-center">
          <thead>
            <tr>
              <th>Item</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {/* <tr>
                <td>John</td>
                <td>Doe</td>
                <td>john@example.com</td>
            </tr>
            <tr> */}
          </tbody>
      </table>
  </Fragment>
    )
}

export default ListItems;