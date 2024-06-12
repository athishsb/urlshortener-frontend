export default function Sent() {
  return (
    <div className="container-fluid min-vh-100 position-relative">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-lg-7 text-center text-lg-start position-absolute w-100 h-100 overflow-hidden">
          {/* background video */}
          <video muted loop autoPlay src="/image/sent.mp4" />
        </div>
        <div
          className="col-lg-4 position-relative d-flex justify-content-center align-items-center"
          style={{ marginTop: "-50px" }}
        >
          <div
            className="card text-center shadow p-5 bg-white"
            style={{ maxWidth: "500px" }}
          >
            <div className="card-body">
              <i
                className="fas fa-check-circle text-success mb-4"
                style={{ fontSize: "3rem" }}
              ></i>
              <h5 className="card-title">Success!</h5>
              <p className="card-text fs-5">
                Link has been sent to your mail. Kindly check your inbox.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
