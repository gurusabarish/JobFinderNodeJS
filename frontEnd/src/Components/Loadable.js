import React, { Suspense } from "react";

//-----------------------|| LOADABLE - LAZY LOADING ||-----------------------//

const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  );

const Loader = () => {
  return (
    <div className="loader">
      <h4>loading...</h4>
    </div>
  );
};

export default Loadable;
