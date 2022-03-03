const ServerError = ({ error }) => {
  if (isErrorExist(error)) {
    if (error.data.errors.length > 0) {
      return (
        <div className="alert alert-danger">
          {error.data.errors.map((err) => (
            <p key={err}>{err}</p>
          ))}
        </div>
      );
    }

    return <p className="alert alert-danger">{error.data.message}</p>;
  } else {
    return null;
  }
};

export default ServerError;

function isErrorExist(error) {
  return error && error.data;
}
