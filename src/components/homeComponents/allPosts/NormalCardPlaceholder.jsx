import { memo } from "react";

function NormalCardPlaceholder() {
  return (
    <div className="col-12 col-sm-6 col-md-4">
      <div className=" placeholder-glow" style={{ height: "15rem" }}>
        <span className="placeholder col-12 h-100"></span>
      </div>

      <div className="card-body background rounded-bottom d-flex flex-column mt-2 ">
        <p className=" d-flex gap-1 placeholder-glow mb-1">
          <span className="placeholder rounded-1 col-3"></span>
        </p>
        <h5 className=" placeholder-glow rounded-1">
          <span className="placeholder rounded-1 col-6"></span>
        </h5>
        <p className="card-text placeholder-glow rounded-1 d-flex flex-column gap-1 mt-3">
          <span className="placeholder rounded-1 col-7"></span>
          <span className="placeholder rounded-1 col-4"></span>
          <span className="placeholder rounded-1 col-6"></span>
        </p>
        <p className="placeholder-glow rounded-1 d-flex flex-wrap gap-2 mt-auto">
          <span className="placeholder rounded-1 col-1 p-2 rounded-5"></span>
          <span className="placeholder rounded-1 col-1 p-2  rounded-5"></span>
          <span className="placeholder rounded-1 col-1 p-2 rounded-5"></span>
        </p>
      </div>
    </div>
  );
}

export default memo(NormalCardPlaceholder);
