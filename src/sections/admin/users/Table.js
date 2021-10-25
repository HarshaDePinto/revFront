import React, { Fragment } from "react";

function Table({ users, setShowSingle, setSingleId }) {
  const editDesigner = (id) => {
    setSingleId(id)
    setShowSingle(true);
  };

  return (
    <Fragment>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Mobile</th>
            <th scope="col">Edit</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((u, i) => (
              <tr key={i}>
                <td>{u.name}</td>
                <td>{u.mobile}</td>
                <td>
                  <button
                    onClick={()=>(editDesigner(u._id))}
                    className="btn-first green-btn text-custom-white"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Fragment>
  );
}

export default Table;
