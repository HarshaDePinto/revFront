import { API } from "../../../config";

export const getInvoiceByDate = (userId, token, abortCont, invoice) => {
  return fetch(
    `${API}/invoices/byDate/${userId}`,
    {
      method: "POST",
      signal: abortCont.signal,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(invoice),
    }
  )
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      if (err.name === "AbortError") {
        console.log("Fetch Aborted");
      } else {
        console.log(err);
      }
    });
};