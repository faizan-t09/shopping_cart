import React from "react";
import { Grid } from "react-loader-spinner";

export const LoadingHOC: React.FC<{
  Wrapped: React.FC;
  loading: boolean;
}> = ({ Wrapped, loading }) => {
  return loading ? (
    <Grid
      height="80vh"
      width="80vw"
      color="#4fa5d8"
      ariaLabel="grid-loading"
      radius="12.5"
      visible={true}
    />
  ) : (
    <Wrapped />
  );
};
