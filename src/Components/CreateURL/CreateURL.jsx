import { useState } from "react";
import { createURL, updateURLCount } from "../../Services/APIservice";
import useURLContext from "../../Context/useURLContext";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

// Define validation schema using Yup
const validationSchema = Yup.object().shape({
  longURL: Yup.string()
    .url("Invalid URL format")
    .required("Please enter a valid URL"),
});

function CreateURL() {
  const { todayURLlist, setTodayURLlist } = useURLContext();
  const [error, setError] = useState("");

  const createUrlDB = async (data, config) => {
    try {
      const isDuplicate = todayURLlist.some(
        (url) => url.longURL === data.longURL
      );
      if (isDuplicate) {
        setError("Duplicate URL. This URL already exists.");
        return;
      }

      const response = await createURL(data, config);
      if (response.status === 200) {
        setTodayURLlist((prevList) => [...prevList, response.data.data]);
        setError("");
        window.alert("Short URL created");
      }
    } catch (err) {
      //console.log("error", err);
      setError("Network error creating short URL");
    }
  };

  const handleCount = async (e) => {
    const tokenAuth = localStorage.getItem("tokenAuth");
    if (!tokenAuth) return;
    const config = { headers: { "x-auth-token": tokenAuth } };
    const data = { id: e.target.id };
    try {
      const response = await updateURLCount(data, config);
      if (response.status === 200) {
        const updatedUrlData = response.data.data;
        setTodayURLlist((prevList) =>
          prevList.map((ele) =>
            ele.urlID === updatedUrlData.urlID
              ? { ...ele, clicked: updatedUrlData.clicked }
              : ele
          )
        );
      }
    } catch (err) {
      //console.log("error", err);
      setError("Network error updating URL count");
    }
  };

  return (
    <>
      <h5 className="urlheading mb-3">Short URL</h5>
      <div className="container-fluid my-3">
        <div className="d-flex justify-content-center align-items-center flex-lg-row">
          <div className="border border-dark rounded col-sm-10 col-md-8 col-lg-8 bg-s bg-white p-3">
            <Formik
              initialValues={{ longURL: "" }}
              validationSchema={validationSchema}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  setSubmitting(true);
                  const tokenAuth = localStorage.getItem("tokenAuth");
                  const loggedUser = localStorage.getItem("loggedUser");

                  if (!loggedUser || !tokenAuth) {
                    setError("Please log in to continue");
                    return;
                  }

                  const config = { headers: { "x-auth-token": tokenAuth } };

                  const currentDate = new Date();
                  const date = currentDate.getDate();
                  let month = currentDate.getMonth() + 1;
                  const year = currentDate.getFullYear();
                  if (month < 10) month = "0" + month;
                  const monthDateYear = `${year}${month}${date}`;

                  const data = {
                    user: loggedUser,
                    longURL: values.longURL,
                    createdOn: monthDateYear,
                  };

                  await createUrlDB(data, config);

                  setSubmitting(false);
                } catch (err) {
                  //console.log(err);
                  setSubmitting(false);
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="my-3">
                    <label className="text-white fs-4">Enter Long URL:</label>
                    <br />
                    <Field
                      type="text"
                      name="longURL"
                      className="p-2 rounded-2"
                      placeholder="Type URL here.."
                    />
                    <ErrorMessage
                      name="longURL"
                      component="div"
                      className="text-white"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-a btn-lg text-light mt-3"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Creating..." : "Create Short URL"}
                  </button>
                </Form>
              )}
            </Formik>
            {error && <h6 className="m-3 text-white text-break">{error}</h6>}
          </div>
        </div>
      </div>
      <div className="d-flex flex-row justify-content-center">
        {todayURLlist.length > 0 && (
          <div
            className="d-flex flex-row justify-content-center"
            style={{ maxHeight: "400px", width: "75%", overflowY: "auto" }}
          >
            <table className="table table-success table-striped table-responsive-sm w-75">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Date</th>
                  <th scope="col">Short URL</th>
                  <th scope="col">Clicked</th>
                  <th scope="col">Long URL</th>
                </tr>
              </thead>
              <tbody>
                {todayURLlist.map((ele, index) => (
                  <tr key={ele.urlID}>
                    <th scope="row">{index + 1}</th>
                    <td>{ele.createdOn}</td>
                    <td>
                      <a
                        id={ele.urlID}
                        href={`/${ele.urlID}`}
                        onClick={handleCount}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {ele.shortURL}
                      </a>
                    </td>
                    <td>{ele.clicked}</td>
                    <td className="text-break">
                      {ele.longURL.length > 20
                        ? ele.longURL.substring(0, 60) + "..."
                        : ele.longURL}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

export default CreateURL;
